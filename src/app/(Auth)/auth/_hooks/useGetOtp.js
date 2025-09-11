import { getOtpApi } from "@/services/authServices";
import { useMutation } from "@tanstack/react-query";

export default function useGetOtp() {
  const {
    isPending: isGetting,
    data: otpResponse,
    mutateAsync: getOtp,
  } = useMutation({
    mutationFn: getOtpApi,
  });

  return { isGetting, otpResponse, getOtp };
}
