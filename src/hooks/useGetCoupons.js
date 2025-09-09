import { getCouponApi, getCouponsApi } from "@/services/couponsServices";
import { useQuery } from "@tanstack/react-query";

export function useGetCoupons(queries) {
  const { isLoading, data } = useQuery({
    queryKey: ["coupons", queries],
    queryFn: () => getCouponsApi(queries),
  });

  const { coupons, pagination } = data || {};

  return { isLoading, coupons, pagination };
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
