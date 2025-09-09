import { getUserInfoApi } from "@/services/authServices";
import { getUserApi, getUsersApi } from "@/services/usersServices";
import { useQuery } from "@tanstack/react-query";

export function useGetUsers(queries) {
  const { isLoading, data } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUsersApi(queries),
  });

  console.log(data);

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

export function useGetUserInfo() {
  const { isLoading, data } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfoApi,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const { user = {}, cart, payments } = data || {};

  return { isLoading, user, cart, payments };
}
