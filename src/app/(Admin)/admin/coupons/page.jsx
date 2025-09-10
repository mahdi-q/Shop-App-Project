"use client";

import Loader from "@/ui/Loader";
import Link from "next/link";
import CouponsTable from "./_components/CouponsTable";
import { useGetCoupons } from "@/hooks/useGetCoupons";
import { useSearchParams } from "next/navigation";
import Pagination from "@/ui/Pagination";
import SearchBox from "@/ui/SearchBox";
import SortButton from "@/ui/SortButton";

function CouponsPage() {
  const searchParams = useSearchParams();
  const queries = searchParams.toString();
  const { isLoading, coupons, pagination } = useGetCoupons(queries);

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-black sm:text-lg lg:text-xl">
            لیست کدهای تخفیف
          </h2>

          <Link
            href="/admin/coupons/create"
            className="btn btn--outline leading-5 text-primary-900 md:hidden"
          >
            ایجاد کد تخفیف جدید
          </Link>
        </div>

        <div className="flex max-w-[700px] flex-1 items-center gap-x-2 xl:gap-x-4">
          <div className="flex-1">
            <SearchBox />
          </div>

          <div>
            <SortButton />
          </div>

          <Link
            href="/admin/coupons/create"
            className="btn btn--outline hidden leading-5 text-primary-900 md:block"
          >
            ایجاد کد تخفیف جدید
          </Link>
        </div>
      </div>

      {isLoading && <Loader />}

      {!isLoading && (!coupons || coupons.length <= 0) && (
        <div className="mt-4 flex items-center justify-center text-black">
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
