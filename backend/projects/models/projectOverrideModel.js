const mongoose = require('mongoose');

// One document per GitHub repo you want to add manual data to.
// Repos with no matching document here just show plain GitHub data.
const projectOverrideSchema = new mongoose.Schema(
    {
        repoName: {
            type: String,
            required: true,
            unique: true
        },
        featured: {
            type: Boolean,
            default: false
        },
        caseStudy: {
            type: String,
            default: ''
        },
        deployment: {
            platform: { type: String, enum: ['railway', 'render', null], default: null },
            projectId: { type: String },
            environmentId: { type: String },
            serviceId: { type: String },
            liveUrl: { type: String }
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('ProjectOverride', projectOverrideSchema);
