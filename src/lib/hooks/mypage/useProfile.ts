import { authApi } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";

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
