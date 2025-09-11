"use client";

import { useGetUserInfo } from "@/hooks/useGetUsers";
import Loader from "@/ui/Loader";
import { useSearchParams } from "next/navigation";
import PaymentsTable from "./PaymentsTable";
import Pagination from "@/ui/Pagination";

function UserPaymentsPageClient() {
  const searchParams = useSearchParams();
  const queries = searchParams.toString();
  const { isLoading, payments, pagination } = useGetUserInfo(queries);

  return (
    <div>
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

export default UserPaymentsPageClient;
