import { createPaymentApi } from "@/services/paymentsServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useCreatePayment() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutateAsync: createPayment } = useMutation({
    mutationFn: createPaymentApi,

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return { isCreating, createPayment };
}
