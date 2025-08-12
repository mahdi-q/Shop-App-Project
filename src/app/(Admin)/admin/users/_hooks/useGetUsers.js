import { getUsersApi } from "@/services/usersServices";
import { useQuery } from "@tanstack/react-query";

export default function useGetUsers() {
  const { isLoading, data } = useQuery({
    queryKey: ["users"],
    queryFn: getUsersApi,
  });

  const { users } = data || {};

  return { isLoading, users };
}
