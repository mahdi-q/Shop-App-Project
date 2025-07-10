import { checkOtpApi } from "@/services/authServices";
import { useMutation } from "@tanstack/react-query";

export default function useCheckOtp() {
  const { isPending: isChecking, mutateAsync: checkOtp } = useMutation({
    mutationFn: checkOtpApi,
  });

  return { isChecking, checkOtp };
}
