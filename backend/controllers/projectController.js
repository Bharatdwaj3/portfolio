const ProjectOverride = require('../models/projectOverrideModel');
const { fetchGithubRepos } = require('../services/githubService');
const { getDeploymentStatus } = require('../services/deploymentService');

async function buildProjectList() {
    const repos = await fetchGithubRepos();
    const overrides = await ProjectOverride.find();

    const overrideMap = {};
    overrides.forEach(o => { overrideMap[o.repoName] = o; });

    const projects = await Promise.all(repos.map(async (repo) => {
        const override = overrideMap[repo.name];

        const deploymentStatus = override?.deployment?.platform
            ? await getDeploymentStatus(override.deployment)
            : null;

        return {
            ...repo,
            featured: override?.featured || false,
            caseStudy: override?.caseStudy || '',
            imageUrl: override?.imageUrl || null,
            liveUrl: override?.deployment?.liveUrl || null,
            deploymentStatus
        };
    }));

    return projects;
}

const getProjects = async (req, res) => {
    try {
        const projects = await buildProjectList();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProjectByName = async (req, res) => {
    try {
        const projects = await buildProjectList();
        const project = projects.find(p => p.name === req.params.name);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProjectsByLanguage = async (req, res) => {
    try {
        const projects = await buildProjectList();
        const filtered = projects.filter(
            p => p.language && p.language.toLowerCase() === req.params.language.toLowerCase()
        );
        res.status(200).json(filtered);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getFeaturedProjects = async (req, res) => {
    try {
        const projects = await buildProjectList();
        res.status(200).json(projects.filter(p => p.featured));
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProjectOverride = async (req, res) => {
    try {
        const { featured, caseStudy, deployment, imageUrl } = req.body;

        const override = await ProjectOverride.findOneAndUpdate(
            { repoName: req.params.name },
            { featured, caseStudy, deployment, imageUrl },
            { new: true, upsert: true }
        );

        res.status(200).json(override);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    buildProjectList,
    getProjects,
    getProjectByName,
    getProjectsByLanguage,
    getFeaturedProjects,
    updateProjectOverride
};
