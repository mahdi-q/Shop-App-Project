import { editProductApi } from "@/services/productsServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useEditProduct(id) {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: editProduct } = useMutation({
    mutationFn: editProductApi,

    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ["single-product", id] });
      toast.success(message);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "خطا در آپدیت کردن محصول");
    },
  });

  return { isEditing, editProduct };
}
