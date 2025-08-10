import { removeCouponFromCartApi } from "@/services/cartServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useRemoveCouponFromCart() {
  const queryClient = useQueryClient();

  const { isPending: isRemoving, mutateAsync: removeCouponFromCart } =
    useMutation({
      mutationFn: removeCouponFromCartApi,

      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
    });

  return { isRemoving, removeCouponFromCart };
}
