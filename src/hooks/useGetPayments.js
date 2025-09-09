import { getPaymentApi, getPaymentsApi } from "@/services/paymentsServices";
import { useQuery } from "@tanstack/react-query";

export function useGetPayments(queries) {
  const { isLoading, data } = useQuery({
    queryKey: ["payments"],
    queryFn: () => getPaymentsApi(queries),
  });

  const { payments, pagination } = data || {};

  return { isLoading, payments, pagination };
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
