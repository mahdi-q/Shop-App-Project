import { removeFromCartApi } from "@/services/cartServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useRemoveFromCart() {
  const queryClient = useQueryClient();

  const { isPending: isRemoving, mutateAsync: removeFromCart } = useMutation({
    mutationFn: removeFromCartApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { isRemoving, removeFromCart };
}
