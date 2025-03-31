'use client';

import React, { useEffect, useState } from 'react';
import { Github } from 'lucide-react'
import CountUp from 'react-countup';

const GitHubStats = () => {
  interface GitHubStats {
    public_repos: number;
    followers: number;
    following: number;
  }

  const [stats, setStats] = useState<GitHubStats | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/users/SaiAryan1784")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error("Error fetching GitHub data", err));
  }, []);

  if (!stats) return <Github className="animate-spin text-gray-500" size={30} />;

  return (
    <div className="flex flex-col items-center space-y-2 p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold">GitHub Stats</h2>
      <p>
        Repos:{' '}
        <CountUp start={0} end={stats.public_repos} duration={2} separator="," />
      </p>
      <p>
        Followers:{' '}
        <CountUp start={0} end={stats.followers} duration={2} separator="," />
      </p>
      <p>
        Following:{' '}
        <CountUp start={0} end={stats.following} duration={2} separator="," />
      </p>
    </div>
  );
};

export default GitHubStats;
