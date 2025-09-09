"use client";

import Loader from "@/ui/Loader";
import Link from "next/link";
import CouponsTable from "./_components/CouponsTable";
import { useGetCoupons } from "@/hooks/useGetCoupons";
import { useSearchParams } from "next/navigation";
import Pagination from "@/ui/Pagination";

function CouponsPage() {
  const searchParams = useSearchParams();
  const queries = searchParams.toString();
  const { isLoading, coupons, pagination } = useGetCoupons(queries);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-bold text-black sm:text-lg lg:text-xl">
          لیست کدهای تخفیف
        </h2>

        <Link
          href="/admin/coupons/create"
          className="btn btn--outline text-primary-900 md:text-lg"
        >
          ایجاد کد تخفیف جدید
        </Link>
      </div>

      {isLoading && <Loader />}

      {!isLoading && (!coupons || coupons.length <= 0) && (
        <div className="mt-4 flex items-center justify-center">
          کد تخفیف ای یافت نشد.
        </div>
      )}

      {!isLoading && coupons && coupons.length > 0 && (
        <CouponsTable coupons={coupons} />
      )}

      {!isLoading && coupons && coupons.length > 0 && (
        <div className="mt-6 flex items-center justify-center">
          <Pagination pagination={pagination} />
        </div>
      )}
    </div>
  );
}
export default CouponsPage;
