export interface ReelComment {
  id: string;
  author: string;
  avatar: string;
  role?: string;
  timestamp: string;
  content: string;
  likes: number;
  isLiked?: boolean;
}

export interface CodeSnippet {
  language: string;
  fileName: string;
  code: string;
}

export interface Reel {
  id: string;
  videoUrl: string;
  posterUrl: string;
  ambientColor: string; // e.g. '#6366f1' or '#06b6d4'
  secondaryColor: string;
  creator: {
    id: string;
    name: string;
    handle: string;
    avatar: string;
    role: string;
    verified: boolean;
    followersCount: number;
    isFollowing: boolean;
    github?: string;
    portfolio?: string;
  };
  skill: string; // Main skill category
  project: {
    title: string;
    tagline: string;
    description: string;
    githubRepo?: string;
    liveDemoUrl?: string;
    performanceMetric?: string;
    codeSnippet?: CodeSnippet;
  };
  metrics: {
    likes: number;
    comments: number;
    shares: number;
    saves: number;
    views: string;
  };
  isLiked?: boolean;
  isSaved?: boolean;
  tags: string[];
  commentsList: ReelComment[];
}
