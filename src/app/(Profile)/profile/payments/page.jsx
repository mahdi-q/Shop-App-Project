"use client";

import PaymentsTable from "../_components/PaymentsTable";
import { useGetUserInfo } from "@/hooks/useGetUsers";
import Loader from "@/ui/Loader";

function UserPaymentsPage() {
  const { isLoading, payments } = useGetUserInfo();

  return (
    <div>
      <h2 className="mb-6 font-bold text-black sm:text-lg lg:text-xl">
        لیست تمام تراکنش های کاربر
      </h2>

      {isLoading && <Loader />}

      {!isLoading && (!payments || payments.length <= 0) && (
        <div className="mt-4 flex items-center justify-center">
          تراکنشی یافت نشد
        </div>
      )}

      {!isLoading && payments && payments.length > 0 && (
        <PaymentsTable payments={payments} />
      )}
    </div>
  );
}
export default UserPaymentsPage;
