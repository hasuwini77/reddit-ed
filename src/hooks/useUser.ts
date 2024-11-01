// hooks/useUser.ts
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient } from "../../utils/supabase/client";
import { UserType } from "../../types/types";
import { useEffect } from "react";

const supabase = createClient();

const fetchUserData = async (): Promise<UserType | null> => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: userDetails, error } = await supabase
    .from("users")
    .select("username, avatar")
    .eq("id", user.id)
    .single();

  if (error) throw new Error(error.message);

  return userDetails ? ({ ...userDetails, id: user.id } as UserType) : null;
};

export const useUser = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const checkAuthChange = () => {
      const authChanged = document.cookie.includes("auth_changed=true");
      if (authChanged) {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        document.cookie = "auth_changed=; max-age=0; path=/"; // Clear the cookie
      }
    };

    checkAuthChange(); // Check immediately
    const interval = setInterval(checkAuthChange, 1000); // Check every second

    return () => clearInterval(interval);
  }, [queryClient]);

  return useQuery<UserType | null, Error>({
    queryKey: ["user"],
    queryFn: fetchUserData,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    refetchInterval: 300000, // Refetch every 5 minutes
    staleTime: 300000, // Consider data stale after 5 minutes
  });
};
