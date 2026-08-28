// Pings a project's live URL and reports whether it's currently reachable.
// Used by projectController's buildProjectList() when an override has a
// deployment.liveUrl set.
async function getDeploymentStatus(deployment) {
  if (!deployment?.liveUrl) {
    return { status: 'unknown', statusCode: null };
  }

  try {
    const response = await fetch(deployment.liveUrl, { method: 'HEAD' });
    return {
      status: response.ok ? 'up' : 'down',
      statusCode: response.status,
    };
  } catch (error) {
    return { status: 'down', statusCode: null };
  }
}

module.exports = { getDeploymentStatus };
