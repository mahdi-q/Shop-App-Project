import { getCouponsApi } from "@/services/couponsServices";
import { useQuery } from "@tanstack/react-query";

export default function useGetCoupons() {
  const { isLoading, data } = useQuery({
    queryKey: ["coupons"],
    queryFn: getCouponsApi,
  });

  const { coupons } = data || {};

  return { isLoading, coupons };
}
