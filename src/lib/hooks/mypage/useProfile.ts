import { authApi } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";

/**
 * Custom hook to fetch user profile data
 * @param enabled - Whether to enable the query (default: true)
 * @returns Query result with profile data
 */
export const useProfile = (enabled: boolean = true) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const response = await authApi.getProfile();
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error("No profile data received");
    },
    enabled
  });
};
