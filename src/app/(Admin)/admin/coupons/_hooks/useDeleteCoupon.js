import { deleteCouponApi } from "@/services/couponsServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useDeleteCoupon() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCoupon } = useMutation({
    mutationFn: deleteCouponApi,

    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      toast.success(message);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "خطا در حذف کد تخفیف");
    },
  });

  return { isDeleting, deleteCoupon };
}
