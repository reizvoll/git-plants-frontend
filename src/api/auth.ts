import { addLocaleParam } from "@/lib/store/languageStore";
import { SessionResponse } from "@/lib/types/api/auth";
import { ProfileState } from "@/lib/types/api/profile";
import API, { BASE_URL } from "./api";

// 인증 관련 API
export const authApi = {
  signInWithGithub: () => {
    window.location.href = `${BASE_URL}/api/auth/github`;
  },
  signOut: () => API.post("/api/auth/signout"),
  refresh: () => API.post<SessionResponse>("/api/auth/refresh"),
  getSession: async (retry = true): Promise<{ success: boolean; data: SessionResponse | null }> => {
    try {
      const response = await API.get<SessionResponse>("/api/auth/session", {
        validateStatus: (status) => status < 500 // Treat 4xx as success to avoid interceptor
      });

      // if 401 and not already retried, try refresh
      if (response.status === 401 && retry) {
        try {
          const refreshResponse = await API.post<SessionResponse>(
            "/api/auth/refresh",
            {},
            {
              validateStatus: (status) => status < 500 // Prevent interceptor loop
            }
          );

          // Check if refresh succeeded
          if (refreshResponse.status === 200 && refreshResponse.data) {
            return {
              success: true,
              data: refreshResponse.data
            };
          }

          // Refresh failed (401, 403, etc)
          return {
            success: false,
            data: null
          };
        } catch (refreshError) {
          return {
            success: false,
            data: null
          };
        }
      }

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
