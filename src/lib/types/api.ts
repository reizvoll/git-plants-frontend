export type ApiResponse<T> = {
  success: boolean;
  data: T;
  error: {
    message: string;
    code: string;
  };
};

export type ProfileUser = {
  username: string;
  image: string | null;
};

export type ProfileBadge = {
  id: string;
  awardedAt: string;
  badge: {
    id: number;
    name: string;
    condition: string;
    imageUrl: string;
  };
};

export type ProfileItem = {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  price: number;
};

export type ProfilePlant = {
  id: string;
  name: string;
  stage: "SEED" | "SPROUT" | "GROWING" | "MATURE" | "HARVEST";
  currentContributions: number;
  createdAt: string;
  updatedAt: string;
};

export type GitHubActivity = {
  userId: string;
  type: "Contribution" | "Commit" | "PullRequest";
  repository: string;
  title: string;
  url: string;
  eventId: string;
  createdAt: Date;
  contributionCount: number;
  description?: string | null;
  state?: "MERGED" | "CLOSED";
  mergedAt?: Date | null;
};

export type UserProfile = {
  id: string;
  githubId: string;
  username: string;
  name?: string;
  email?: string;
  image?: string;
};

export type ActivityStats = {
  totalCommits: number;
  totalPullRequests: number;
  totalIssues: number;
  repositories: string[];
};

export type AnalyticsData = {
  timeline: Array<{
    date: string;
    count: number;
  }>;
  repositoryDistribution: Array<{
    repository: string;
    _count: number;
  }>;
  timePattern: Array<{
    createdAt: string;
    _count: number;
  }>;
  availableYears: number[];
};

export type SessionResponse = {
  user: UserProfile;
  isAdmin: boolean;
};
