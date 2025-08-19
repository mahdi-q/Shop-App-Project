import { editCategoryApi } from "@/services/categoriesServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useEditCategory(id) {
  const queryClient = useQueryClient();

  const { isPending: isEditing, mutate: editCategory } = useMutation({
    mutationFn: editCategoryApi,

    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ["single-category", id] });
      toast.success(message);
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "خطا در آپدیت کردن دسته‌بندی",
      );
    },
  });

  return { isEditing, editCategory };
}
