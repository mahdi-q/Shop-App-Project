import { getUserApi } from "@/services/usersServices";
import { useQuery } from "@tanstack/react-query";

export default function useGetUser(id) {
  const { isLoading, data } = useQuery({
    queryKey: ["single-user", id],
    queryFn: () => getUserApi(id),
    enabled: !!id,
  });

  const { user } = data || {};

  return { isLoading, user };
}
