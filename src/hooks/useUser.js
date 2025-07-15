import { getUserApi } from "@/services/authServices";
import { useQuery } from "@tanstack/react-query";

export default function useUser() {
  const { isLoading, data } = useQuery({
    queryKey: ["user"],
    queryFn: getUserApi,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { user = {}, cart, payments } = data || {};

  return { isLoading, user, cart, payments };
}
