import { addCategoryApi } from "@/services/categoriesServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useAddCategory() {
  const queryClient = useQueryClient();

  const { isPending: isAdding, mutate: addCategory } = useMutation({
    mutationFn: addCategoryApi,

    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success(message);
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "خطا در ثبت دسته‌بندی جدید",
      );
    },
  });

  return { isAdding, addCategory };
}
