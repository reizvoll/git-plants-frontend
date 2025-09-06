import { SessionResponse } from "@/lib/types/api/auth";
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
    })),
  equipItem: (userItemId: string, equipped: boolean) => API.put(`/api/garden/user-items/${userItemId}`, { equipped })
};
