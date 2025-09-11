import { completeProfileApi } from "@/services/authServices";
import { useMutation } from "@tanstack/react-query";

export default function useCompleteProfile() {
  const { isPending: isCompleting, mutateAsync: completeProfile } = useMutation(
    {
      mutationFn: completeProfileApi,
    },
  );

  return { isCompleting, completeProfile };
}
