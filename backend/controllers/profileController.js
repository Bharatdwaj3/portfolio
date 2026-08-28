const Profile = require('../models/profileModel');

// There's only ever one profile document. This finds it, or creates an
// empty one on first use so the app never has to handle a "no profile yet" case.
async function getOrCreateProfile() {
    let profile = await Profile.findOne();
    if (!profile) {
        profile = await Profile.create({});
    }
    return profile;
}

const getProfile = async (req, res) => {
    try {
        const profile = await getOrCreateProfile();
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Owner-only: update your bio, links, resume URL, or services list.
const updateProfile = async (req, res) => {
    try {
        const profile = await getOrCreateProfile();
        const { fullName, headline, bio, links, resumeUrl, services } = req.body;

        if (fullName !== undefined) profile.fullName = fullName;
        if (headline !== undefined) profile.headline = headline;
        if (bio !== undefined) profile.bio = bio;
        if (links !== undefined) profile.links = links;
        if (resumeUrl !== undefined) profile.resumeUrl = resumeUrl;
        if (services !== undefined) profile.services = services;

        await profile.save();
        res.status(200).json(profile);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getProfile, updateProfile };