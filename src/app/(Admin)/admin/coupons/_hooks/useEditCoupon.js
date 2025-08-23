import { editCouponApi } from "@/services/couponsServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useEditCoupon(id) {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: editCoupon } = useMutation({
    mutationFn: editCouponApi,

    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ["single-coupon", id] });
      toast.success(message);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "خطا در آپدیت کردن کد تخفیف");
    },
  });

  return { isEditing, editCoupon };
}
