import { addToCartApi } from "@/services/cartServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAddToCart() {
  const queryClient = useQueryClient();

  const { isPending: isAdding, mutateAsync: addToCart } = useMutation({
    mutationFn: addToCartApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { isAdding, addToCart };
}
