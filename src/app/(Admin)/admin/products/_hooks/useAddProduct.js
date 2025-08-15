import { addProductApi } from "@/services/productsServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useAddProduct() {
  const queryClient = useQueryClient();

  const { isPending: isAdding, mutate: addProduct } = useMutation({
    mutationFn: addProductApi,

    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(message);
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "خطا در تغییر اطلاعات کاربری",
      );
    },
  });

  return { isAdding, addProduct };
}
