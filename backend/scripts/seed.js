require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
require('../config/db_conn');
const mongoose = require('mongoose');
const Profile = require('../models/profileModel');
const SkillMeta = require('../models/skillMetaModel');
const ProjectOverride = require('../models/projectOverrideModel');

// ─── Profile ──────────────────────────────────────────────────────────────
const profileData = {
  fullName: "Bharat Dwaj",
  headline: "Full-Stack Developer & Systems Builder",
  bio: "I build scalable web applications and craft high-performance digital products for teams and clients.",
  resumeUrl: "",
  services: ["Web Development", "REST API Design", "DevOps & Containerization", "Full-Stack Development"],
  links: [],
};

async function seedProfile() {
  let profile = await Profile.findOne();
  if (!profile) {
    profile = await Profile.create(profileData);
    console.log('[profile] Created new profile document.');
  } else {
    Object.assign(profile, profileData);
    await profile.save();
    console.log('[profile] Updated existing profile document.');
  }
}

// ─── Skill categories ───────────────────────────────────────────────────────
const skillCategoryMap = {
  Java: 'Languages', JavaScript: 'Languages', TypeScript: 'Languages', C: 'Languages',
  PHP: 'Languages', Python: 'Languages', HTML: 'Languages', CSS: 'Languages',
  SCSS: 'Languages', Blade: 'Languages', Makefile: 'Languages', 'yaml-configuration': 'Languages',
  reactjs: 'Frontend', react: 'Frontend', tailwindcss: 'Frontend',
  expressjs: 'Backend', nodejs: 'Backend', 'razorpay-api': 'Backend',
  mongo: 'Databases', mongoose: 'Databases',
  docker: 'DevOps', dockerfile: 'DevOps', helm: 'DevOps', kubernetes: 'DevOps',
};

async function seedSkillCategories() {
  let count = 0;
  for (const [name, category] of Object.entries(skillCategoryMap)) {
    await SkillMeta.findOneAndUpdate({ name }, { category }, { upsert: true, new: true });
    count++;
  }
  console.log(`[skills] Seeded ${count} skill categories.`);
}

// ─── Project overrides (screenshots) ────────────────────────────────────────
// Fill in real, hosted screenshot URLs before running this script.
// (imgur, GitHub raw via a committed image, your own storage, etc.)
const projectOverrides = [
  { repoName: 'HonKhana', imageUrl: 'PASTE_YOUR_HONKHANA_SCREENSHOT_URL_HERE' },
  { repoName: 'augen', imageUrl: 'PASTE_YOUR_AUGEN_SCREENSHOT_URL_HERE' },
  { repoName: 'Library-App', imageUrl: 'PASTE_YOUR_LIBRARY_APP_SCREENSHOT_URL_HERE' },
];

async function seedProjectOverrides() {
  for (const { repoName, imageUrl } of projectOverrides) {
    if (imageUrl.startsWith('PASTE_YOUR_')) {
      console.warn(`[projects] Skipping ${repoName} — placeholder URL not filled in.`);
      continue;
    }
    await ProjectOverride.findOneAndUpdate({ repoName }, { imageUrl }, { upsert: true, new: true });
    console.log(`[projects] Set imageUrl for ${repoName}`);
  }
}

// ─── Run all ────────────────────────────────────────────────────────────────
async function seedAll() {
  await new Promise((resolve) => mongoose.connection.once('open', resolve));
  await seedProfile();
  await seedSkillCategories();
  await seedProjectOverrides();
  await mongoose.connection.close();
  process.exit(0);
}

seedAll().catch((err) => {
  console.error(err);
  process.exit(1);
});
