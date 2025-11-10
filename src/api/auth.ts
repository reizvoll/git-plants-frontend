import { SessionResponse } from "@/lib/types/api/auth";
import { ProfileState } from "@/lib/types/api/profile";
import { addLocaleParam } from "@/lib/store/languageStore";
import API, { BASE_URL } from "./api";

// 인증 관련 API
export const authApi = {
  signInWithGithub: () => {
    window.location.href = `${BASE_URL}/api/auth/github`;
  },
  signOut: () => API.post("/api/auth/signout"),
  getSession: async () => {
    try {
      const response = await API.get<SessionResponse>("/api/auth/session");
      if (response.status === 401) {
        return {
          success: false,
          data: null
        };
      }
      return {
        success: true,
        data: response.data
      };
    } catch {
      return {
        success: false,
        data: null
      };
    }
  },
  getProfile: () => {
    const url = addLocaleParam("/api/users/profile");
    return API.get<ProfileState>(url).then((response) => ({
      success: true,
      data: response.data
    }));
  },
  equipItem: (userItemId: string, equipped: boolean) => API.put(`/api/garden/user-items/${userItemId}`, { equipped })
};
