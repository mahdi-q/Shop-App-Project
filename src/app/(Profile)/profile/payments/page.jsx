"use client";

import Pagination from "@/ui/Pagination";
import PaymentsTable from "../_components/PaymentsTable";
import { useSearchParams } from "next/navigation";
import { useGetUserInfo } from "@/hooks/useGetUsers";
import Loader from "@/ui/Loader";

function UserPaymentsPage() {
  const searchParams = useSearchParams();
  const queries = searchParams.toString();
  const { isLoading, payments, pagination } = useGetUserInfo(queries);

  return (
    <div>
      <h2 className="mb-6 font-bold text-black sm:text-lg lg:text-xl">
        لیست تمام تراکنش های کاربر
      </h2>

      {isLoading && <Loader />}

      {!isLoading && (!payments || payments.length <= 0) && (
        <div className="mt-4 flex items-center justify-center text-black">
          تراکنشی یافت نشد.
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
export default UserPaymentsPage;
