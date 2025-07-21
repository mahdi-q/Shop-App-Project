import { updateProfileApi } from "@/services/authServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useUpdateProfile() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateProfile } = useMutation({
    mutationFn: updateProfileApi,

    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(message);
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "خطا در تغییر اطلاعات کاربری",
      );
    },
  });

  return { isUpdating, updateProfile };
}
