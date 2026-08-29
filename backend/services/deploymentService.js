

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
