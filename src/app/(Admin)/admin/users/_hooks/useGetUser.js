import { getUserApi } from "@/services/usersServices";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function useGetUser() {
  const { userId } = useParams();

  const { isLoading, data } = useQuery({
    queryKey: ["users"],
    queryFn: () => getUserApi(userId),
  });

  const { user } = data || {};

  return { isLoading, user };
}
