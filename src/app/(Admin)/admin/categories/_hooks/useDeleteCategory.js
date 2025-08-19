import { deleteCategoryApi } from "@/services/categoriesServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useDeleteCategory() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCategory } = useMutation({
    mutationFn: deleteCategoryApi,

    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success(message);
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "خطا در حذف دسته‌بندی");
    },
  });

  return { isDeleting, deleteCategory };
}
