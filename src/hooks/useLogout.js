import { logoutApi } from "@/services/authServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function useLogout() {
  const queryClient = useQueryClient();

  const router = useRouter();

  const { isPending, mutate: logout } = useMutation({
    mutationFn: logoutApi,

    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });

      toast.success("با موفقیت از حساب کاربری خود خارج شدید");

      router.replace("/");
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "خطا در خروج از حساب کاربری",
      );
    },
  });

  return { isPending, logout };
}
