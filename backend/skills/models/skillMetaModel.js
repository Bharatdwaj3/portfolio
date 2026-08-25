const mongoose = require('mongoose');

// One document per skill you want to add manual data to.
// This covers two cases:
// 1. A skill that Projects already detected (e.g. "TypeScript") - adds category/level/visibility on top
// 2. A skill Projects could never detect (e.g. "Client Communication") - added here from scratch
const skillMetaSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        category: {
            type: String,
            enum: ['Language', 'Framework', 'Tool', 'Other'],
            default: 'Other'
        },
        level: {
            type: String,
            enum: ['Beginner', 'Intermediate', 'Advanced'],
            default: 'Intermediate'
        },
        visible: {
            type: Boolean,
            default: true
        },
        // True for skills you added by hand that don't come from any repo's data
        manuallyAdded: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('SkillMeta', skillMetaSchema);