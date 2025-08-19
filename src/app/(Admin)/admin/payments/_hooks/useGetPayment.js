import { getPaymentApi } from "@/services/paymentsServices";
import { useQuery } from "@tanstack/react-query";

export default function useGetPayment(id) {
  const { isLoading, data } = useQuery({
    queryKey: ["single-payment", id],
    queryFn: () => getPaymentApi(id),
    enabled: !!id,
  });

  const { payment: paymentArr = [] } = data || {};
  const payment = paymentArr[0] || {};

  return { isLoading, payment };
}
