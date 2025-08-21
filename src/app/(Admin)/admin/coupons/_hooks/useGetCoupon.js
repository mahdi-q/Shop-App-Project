import { getCouponApi } from "@/services/couponsServices";
import { useQuery } from "@tanstack/react-query";

export default function useGetCoupon(id) {
  const { isLoading, data } = useQuery({
    queryKey: ["single-coupon", id],
    queryFn: () => getCouponApi(id),
    enabled: !!id,
  });

  const { coupon } = data || {};

  return { isLoading, coupon };
}
