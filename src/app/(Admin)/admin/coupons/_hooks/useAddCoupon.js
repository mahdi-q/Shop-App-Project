import { addCouponApi } from "@/services/couponsServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useAddCoupon() {
  const queryClient = useQueryClient();

  const { isPending: isAdding, mutate: addCoupon } = useMutation({
    mutationFn: addCouponApi,

    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
      toast.success(message);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "خطا در ثبت کد تخفیف جدید");
    },
  });

  return { isAdding, addCoupon };
}
