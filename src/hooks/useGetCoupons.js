import { getCouponApi, getCouponsApi } from "@/services/couponsServices";
import { useQuery } from "@tanstack/react-query";

export function useGetCoupons() {
  const { isLoading, data } = useQuery({
    queryKey: ["coupons"],
    queryFn: getCouponsApi,
  });

  const { coupons } = data || {};

  return { isLoading, coupons };
}

export function useGetCoupon(id) {
  const { isLoading, data } = useQuery({
    queryKey: ["single-coupon", id],
    queryFn: () => getCouponApi(id),
    enabled: !!id,
  });

  const { coupon } = data || {};

  return { isLoading, coupon };
}
