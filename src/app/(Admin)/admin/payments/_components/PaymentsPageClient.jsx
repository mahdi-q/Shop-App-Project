"use client";

import { useGetPayments } from "@/hooks/useGetPayments";
import Loader from "@/ui/Loader";
import { useSearchParams } from "next/navigation";
import PaymentsTable from "./PaymentsTable";
import Pagination from "@/ui/Pagination";

function PaymentsPageClient() {
  const searchParams = useSearchParams();
  const queries = searchParams.toString();
  const { isLoading, payments, pagination } = useGetPayments(queries);

  return (
    <div>
      {isLoading && <Loader />}

      {!isLoading && (!payments || payments.length <= 0) && (
        <div className="mt-4 flex items-center justify-center text-black">
          سفارشی یافت نشد.
        </div>
      )}

      {!isLoading && payments && payments.length > 0 && (
        <PaymentsTable payments={payments} />
      )}

      {!isLoading && payments && payments.length > 0 && (
        <div className="mt-6 flex items-center justify-center">
          <Pagination pagination={pagination} />
        </div>
      )}
    </div>
  );
}

export default PaymentsPageClient;
