import { deleteProductApi } from "@/services/productsServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useDeleteProduct() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteProduct } = useMutation({
    mutationFn: deleteProductApi,

    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(message);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "خطا در حذف محصول");
    },
  });

  return { isDeleting, deleteProduct };
}
