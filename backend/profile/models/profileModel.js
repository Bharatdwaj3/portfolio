const mongoose = require('mongoose');

// Only one document is ever expected in this collection - it represents you.
const profileSchema = new mongoose.Schema(
    {
        fullName: { type: String, default: '' },
        headline: { type: String, default: '' },
        bio: { type: String, default: '' },
        links: [{ label: String, url: String }],
        resumeUrl: { type: String, default: '' },
        services: [{ type: String }]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Profile', profileSchema);