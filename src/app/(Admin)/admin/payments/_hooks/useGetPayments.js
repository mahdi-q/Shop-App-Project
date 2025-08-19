import { getPaymentsApi } from "@/services/paymentsServices";
import { useQuery } from "@tanstack/react-query";

export default function useGetPayments() {
  const { isLoading, data } = useQuery({
    queryKey: ["payments"],
    queryFn: getPaymentsApi,
  });

  const { payments } = data || {};

  return { isLoading, payments };
}
