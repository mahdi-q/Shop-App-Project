import { getPaymentApi, getPaymentsApi } from "@/services/paymentsServices";
import { useQuery } from "@tanstack/react-query";

export function useGetPayments() {
  const { isLoading, data } = useQuery({
    queryKey: ["payments"],
    queryFn: getPaymentsApi,
  });

  const { payments } = data || {};

  return { isLoading, payments };
}

export function useGetPayment(id) {
  const { isLoading, data } = useQuery({
    queryKey: ["single-payment", id],
    queryFn: () => getPaymentApi(id),
    enabled: !!id,
  });

  const { payment: paymentArr = [] } = data || {};
  const payment = paymentArr[0] || {};

  return { isLoading, payment };
}
