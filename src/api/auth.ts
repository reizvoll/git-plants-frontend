import { ApiResponse } from "@/lib/types/api/api";
import { SessionResponse } from "@/lib/types/api/auth";
import { ActivityStats, GitHubActivity } from "@/lib/types/api/github";
import { ProfileState } from "@/lib/types/api/profile";
import API, { BASE_URL } from "./api";

// 인증 관련 API
export const authApi = {
  signInWithGithub: () => {
    window.location.href = `${BASE_URL}/api/auth/github`;
  },
  signOut: () => API.post("/api/auth/signout"),
  getSession: async () => {
    const response = await API.get<SessionResponse>("/api/auth/session");
    return {
      success: true,
      data: response.data
    };
  },
  getProfile: () =>
    API.get<ProfileState>("/api/users/profile").then((response) => ({
      success: true,
      data: response.data
    }))
};

// GitHub 활동 관련 API
export const githubApi = {
  getActivities: (params?: {
    period?: "day" | "week" | "month" | "year" | "all";
    year?: number;
    type?: "contribution" | "commit" | "pull_request";
    repository?: string;
  }) => API.get<ApiResponse<GitHubActivity[]>>("/api/activities", { params }),
  getActivityById: (id: string) => API.get<ApiResponse<GitHubActivity>>(`/api/activities/${id}`),
  getStats: (params?: { period?: "day" | "week" | "month" | "year" }) =>
    API.get<ApiResponse<ActivityStats>>("/api/activities/stats", { params }),
  getAnalytics: (params?: { period?: "day" | "week" | "month" | "year" | "all"; year?: number }) =>
    API.get<
      ApiResponse<{
        timeline: Array<{ date: string; count: number }>;
        repositoryDistribution: Array<{ repository: string; _count: number }>;
        timePattern: Array<{ createdAt: string; _count: number }>;
      }>
    >("/api/activities/analytics", { params }),
  getAvailableYears: () => API.get<ApiResponse<number[]>>("/api/activities/years"),
  syncActivities: () =>
    API.post<ApiResponse<{ message: string; activities: GitHubActivity[] }>>("/api/activities/sync"),
  setAutoSync: (enabled: boolean) =>
    API.post<ApiResponse<{ message: string }>>("/api/activities/sync/auto", { enabled })
};
