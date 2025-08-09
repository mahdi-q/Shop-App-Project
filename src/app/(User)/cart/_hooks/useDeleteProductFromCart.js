import { deleteProductFromCartApi } from "@/services/cartServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteProductFromCart() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutateAsync: deleteProductFromCart } =
    useMutation({
      mutationFn: deleteProductFromCartApi,

      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      },
    });

  return { isDeleting, deleteProductFromCart };
}
