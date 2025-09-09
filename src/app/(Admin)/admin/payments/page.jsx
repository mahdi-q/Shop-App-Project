"use client";

import Loader from "@/ui/Loader";
import PaymentsTable from "./_components/PaymentsTable";
import { useGetPayments } from "@/hooks/useGetPayments";
import { useSearchParams } from "next/navigation";

function PaymentsPage() {
  const searchParams = useSearchParams();
  const queries = searchParams.toString();
  const { isLoading, payments } = useGetPayments(queries);

  return (
    <div>
      <h2 className="mb-6 font-bold text-black sm:text-lg lg:text-xl">
        لیست سفارشات
      </h2>

      {isLoading && <Loader />}

      {!isLoading && (!payments || payments.length <= 0) && (
        <div className="mt-4 flex items-center justify-center">
          سفارشی یافت نشد.
        </div>
      )}

      {!isLoading && payments && payments.length > 0 && (
        <PaymentsTable payments={payments} />
      )}
    </div>
  );
}

export default PaymentsPage;
