import { getUserInfoApi } from "@/services/authServices";
import { getUserApi, getUsersApi } from "@/services/usersServices";
import { useQuery } from "@tanstack/react-query";

export function useGetUsers(queries) {
  const { isLoading, data } = useQuery({
    queryKey: ["users", queries],
    queryFn: () => getUsersApi(queries),
  });

  const { users, pagination } = data || {};

  return { isLoading, users, pagination };
}

export function useGetUser(id) {
  const { isLoading, data } = useQuery({
    queryKey: ["single-user", id],
    queryFn: () => getUserApi(id),
    enabled: !!id,
  });

  const { user } = data || {};

  return { isLoading, user };
}

export function useGetUserInfo(queries) {
  const { isLoading, data } = useQuery({
    queryKey: ["user", queries],
    queryFn: () => getUserInfoApi(queries),
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { user = {}, cart, payments, pagination } = data || {};

  return { isLoading, user, cart, payments, pagination };
}
