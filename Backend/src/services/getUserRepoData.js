
export async function getRepoData(username, headers){
    const response = await fetch(`https://api.github.com/users/${username}`, {headers})
    const data = await response.json()
    return data;
}

async function getAllRepo(username, headers){
    let repos = [];
    let page = 1;

    while(true){
        const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&page=${page}`, {headers});
        const data = await res.json();
        if(data.length === 0) break;
        repos = repos.concat(data.filter((repo) => repo.created_at?.startsWith('2026-')));
        page++;
    }

    return repos;
}

export async function getLanguageStats(username, headers) {
    const repos = await getAllRepo(username, headers);
    let totalLangs = [];
    for(const repo of repos){
        if (repo.fork) continue; 
        const res = await fetch( `https://api.github.com/repos/${username}/${repo.name}/languages`,{ headers });
        const langs = await res.json();
        for (const [lang, bytes] of Object.entries(langs)) {
      totalLangs[lang] = (totalLangs[lang] || 0) + bytes;
    }
  }

  const totalBytes = Object.values(totalLangs).reduce((a, b) => a + b, 0);
  const percentages = Object.entries(totalLangs)
    .map(([lang, bytes]) => ({ lang, pct: ((bytes / totalBytes) * 100).toFixed(2) }))
    .sort((a, b) => b.pct - a.pct);


  return percentages[0] || null;
}

export async function getTopRepos(username, headers) {
  const repos = (await getAllRepo(username, headers)).filter((repo) => !repo.fork);
  const mostStarred = repos.reduce((topRepo, repo) => (
    !topRepo || repo.stargazers_count > topRepo.stargazers_count ? repo : topRepo
  ), null);

  const formatRepo = (repo) => repo && ({
    name: repo.name,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
  });

  return {
    mostStarred: formatRepo(mostStarred),
  };
}

export async function getCommitStats(username, headers) {
  const repos = (await getAllRepo(username, headers)).filter((repo) => !repo.fork);
  const stats = {
    totalCommits: 0,
    additions: 0,
    deletions: 0,
  };

  for (const repo of repos) {
    for (let page = 1; page <= 10; page++) {
      const response = await fetch(
        `https://api.github.com/repos/${username}/${repo.name}/commits?author=${username}&since=2026-01-01T00:00:00Z&until=2026-12-31T23:59:59Z&per_page=100&page=${page}`,
        { headers }
      );
      const commits = await response.json();

      if (!Array.isArray(commits)) {
        throw new Error(commits.message || 'Unable to fetch repository commits');
      }

      for (let start = 0; start < commits.length; start += 10) {
        const batch = commits.slice(start, start + 10);
        const commitDetails = await Promise.all(batch.map(async (commit) => {
          const detailResponse = await fetch(
            `https://api.github.com/repos/${username}/${repo.name}/commits/${commit.sha}`,
            { headers }
          );
          const commitDetail = await detailResponse.json();

          if (commitDetail.message) {
            throw new Error(commitDetail.message);
          }

          return commitDetail;
        }));

        for (const commitDetail of commitDetails) {
          stats.totalCommits++;
          stats.additions += commitDetail.stats?.additions || 0;
          stats.deletions += commitDetail.stats?.deletions || 0;
        }
      }

      if (commits.length < 100) break;
    }
  }

  return stats;
}

export async function getActivityStreak(username, headers) {
  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
              }
            }
          }
        }
      }
    }
  `;
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: { ...headers, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables: {
        username,
        from: '2026-01-01T00:00:00Z',
        to: '2026-12-31T23:59:59Z',
      },
    }),
  });
  const result = await response.json();

  if (result.errors) {
    throw new Error(result.errors[0].message);
  }

  const activeDates = result.data.user.contributionsCollection.contributionCalendar.weeks
    .flatMap((week) => week.contributionDays)
    .filter((day) => day.contributionCount > 0)
    .map((day) => day.date)
    .sort();

  let longestStreak = 0;
  let currentStreak = 0;
  let streakStartDate = null;
  let longestStreakStartDate = null;
  let longestStreakEndDate = null;

  for (let index = 0; index < activeDates.length; index++) {
    const currentDate = new Date(`${activeDates[index]}T00:00:00Z`);
    const previousDate = index > 0
      ? new Date(`${activeDates[index - 1]}T00:00:00Z`)
      : null;
    const isConsecutive = previousDate
      && currentDate - previousDate === 24 * 60 * 60 * 1000;

    currentStreak = isConsecutive ? currentStreak + 1 : 1;
    if (currentStreak === 1) streakStartDate = activeDates[index];

    if (currentStreak > longestStreak) {
      longestStreak = currentStreak;
      longestStreakStartDate = streakStartDate;
      longestStreakEndDate = activeDates[index];
    }
  }

  return {
    longestStreak,
    startDate: longestStreakStartDate,
    endDate: longestStreakEndDate,
  };
}