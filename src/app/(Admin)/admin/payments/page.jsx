"use client";

import Loader from "@/ui/Loader";
import PaymentsTable from "./_components/PaymentsTable";
import { useGetPayments } from "@/hooks/useGetPayments";
import { useSearchParams } from "next/navigation";
import Pagination from "@/ui/Pagination";
import SearchBox from "@/ui/SearchBox";
import SortButton from "@/ui/SortButton";

function PaymentsPage() {
  const searchParams = useSearchParams();
  const queries = searchParams.toString();
  const { isLoading, payments, pagination } = useGetPayments(queries);

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <h2 className="font-bold text-black sm:text-lg lg:text-xl">
          لیست سفارشات
        </h2>

        <div className="flex max-w-[500px] flex-1 items-center gap-x-2 md:gap-x-4">
          <div className="flex-1">
            <SearchBox />
          </div>

          <div>
            <SortButton />
          </div>
        </div>
      </div>

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

export default PaymentsPage;
