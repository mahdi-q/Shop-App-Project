import { addCouponToCartApi } from "@/services/cartServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAddCouponToCart() {
  const queryClient = useQueryClient();

  const { isPending: isAdding, mutateAsync: addCouponToCart } = useMutation({
    mutationFn: addCouponToCartApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { isAdding, addCouponToCart };
}
