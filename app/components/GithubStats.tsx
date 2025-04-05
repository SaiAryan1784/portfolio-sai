'use client';

import React, { useEffect, useState } from 'react';
import { Github } from 'lucide-react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';

interface GitHubStatsInterface {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url : string;
}

const GitHubStats = () => {
  const [stats, setStats] = useState<GitHubStatsInterface | null>(null);
  const { ref, inView } = useInView({
    triggerOnce: true,  // Fetch only once when it becomes visible
    threshold: 0.1,     // Consider visible when 10% of the component is in view
  });

  useEffect(() => {
    if (inView && !stats) {
      fetch("https://api.github.com/users/SaiAryan1784")
        .then((res) => res.json())
        .then((data) => setStats(data))
        .catch((err) => console.error("Error fetching GitHub data", err));
    }
  }, [inView, stats]);

  if (!stats)
    return (
      <div ref={ref}>
        <Github className="animate-spin text-gray-500" size={30} />
      </div>
    );

  return (
    <div ref={ref} className="flex flex-col items-center space-y-2 p-4 border rounded-lg shadow-md bg-white">
      <Link href="https://github.com/SaiAryan1784" className="text-xl font-bold">GitHub Profile</Link>
      <Image src={stats.avatar_url} alt="avatar" className='rounded-full' width={40} height={40} />
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
