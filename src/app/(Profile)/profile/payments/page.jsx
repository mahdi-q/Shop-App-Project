"use client";

import { PulseLoader } from "react-spinners";
import PaymentsTable from "../_components/PaymentsTable";
import useUser from "@/hooks/useUser";

function UserPaymentsPage() {
  const { isLoading, payments } = useUser();

  return (
    <div>
      <h2 className="mb-6 font-bold text-black sm:text-lg lg:text-xl">
        لیست تمام تراکنش های کاربر
      </h2>

      {isLoading && (
        <div className="flex items-center justify-center">
          <span className="ml-2 text-primary-900">در حال بارگذاری</span>

          <PulseLoader
            color="rgb(var(--color-primary-900))"
            size={12}
            margin={3}
          />
        </div>
      )}

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
