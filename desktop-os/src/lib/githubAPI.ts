export interface GitHubRepo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
}

export async function fetchLatestRepos(username: string, limit = 6): Promise<GitHubRepo[]> {
  const res = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}`,
    { headers: { Accept: 'application/vnd.github+json' } }
  );

  if (!res.ok) {
    throw new Error(`GitHub API request failed: ${res.status}`);
  }

  return res.json();
}
