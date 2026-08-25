// Fetches all public repos for the configured GitHub user and maps them
// into the shape the rest of the service works with.
async function fetchGithubRepos() {
    const username = process.env.GHCR_USERNAME;
    const token = process.env.GHCR_Token;

    const headers = { 'Accept': 'application/vnd.github+json' };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100`,
        { headers }
    );

    if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();

    return repos.map(repo => ({
        name: repo.name,
        description: repo.description,
        htmlUrl: repo.html_url,
        language: repo.language,
        topics: repo.topics || [],
        stars: repo.stargazers_count,
        updatedAt: repo.updated_at
    }));
}

module.exports = { fetchGithubRepos };