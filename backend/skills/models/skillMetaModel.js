const mongoose = require('mongoose');

// One document per skill you want to override or manually add.
// Skills with no matching document here just use the auto-derived
// defaults (category 'Other', level 'Intermediate', visible true).
const skillMetaSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        category: {
            type: String,
            default: 'Other'
        },
        level: {
            type: String,
            default: 'Intermediate'
        },
        visible: {
            type: Boolean,
            default: true
        },
        manuallyAdded: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('SkillMeta', skillMetaSchema);
