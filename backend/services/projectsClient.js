const { buildProjectList } = require('../controllers/projectController');

// Was an HTTP call to the Projects service; now a direct function
// call since everything runs in one process.
async function deriveSkillsFromProjects() {
  const projects = await buildProjectList();

  const counts = {};
  projects.forEach(project => {
    if (project.language) {
      counts[project.language] = (counts[project.language] || 0) + 1;
    }
    (project.topics || []).forEach(topic => {
      counts[topic] = (counts[topic] || 0) + 1;
    });
  });

  return Object.entries(counts).map(([name, projectCount]) => ({
    name,
    projectCount
  }));
}

module.exports = { deriveSkillsFromProjects };
