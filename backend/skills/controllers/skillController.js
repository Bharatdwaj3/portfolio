const SkillMeta = require('../models/skillMetaModel');
const { deriveSkillsFromProjects } = require('../services/projectsClient');

// Combines the auto-derived skill list with any owner overrides in Mongo.
async function buildSkillList() {
    const derivedSkills = await deriveSkillsFromProjects();
    const overrides = await SkillMeta.find();

    const overrideMap = {};
    overrides.forEach(o => { overrideMap[o.name] = o; });

    // Start with auto-derived skills, layering any matching override on top.
    const merged = derivedSkills.map(skill => {
        const override = overrideMap[skill.name];
        return {
            name: skill.name,
            projectCount: skill.projectCount,
            category: override?.category || 'Other',
            level: override?.level || 'Intermediate',
            visible: override ? override.visible : true
        };
    });

    // Add any manually-added skills that have no matching derived entry
    // (e.g. "Client Communication", which no repo could ever show).
    const derivedNames = new Set(derivedSkills.map(s => s.name));
    overrides
        .filter(o => o.manuallyAdded && !derivedNames.has(o.name))
        .forEach(o => {
            merged.push({
                name: o.name,
                projectCount: 0,
                category: o.category,
                level: o.level,
                visible: o.visible
            });
        });

    return merged.filter(skill => skill.visible);
}

const getSkills = async (req, res) => {
    try {
        const skills = await buildSkillList();
        res.status(200).json(skills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Owner-only: create or update override data for one skill.
const updateSkill = async (req, res) => {
    try {
        const { category, level, visible, manuallyAdded } = req.body;

        const skill = await SkillMeta.findOneAndUpdate(
            { name: req.params.name },
            { category, level, visible, manuallyAdded },
            { new: true, upsert: true }
        );

        res.status(200).json(skill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getSkills, updateSkill };
