"use client";

import Loader from "@/ui/Loader";
import PaymentsTable from "./_components/PaymentsTable";
import { useGetPayments } from "@/hooks/useGetPayments";

function PaymentsPage() {
  const { isLoading, payments } = useGetPayments();

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
        <PaymentsTable
          payments={payments.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          )}
        />
      )}
    </div>
  );
}

export default PaymentsPage;
