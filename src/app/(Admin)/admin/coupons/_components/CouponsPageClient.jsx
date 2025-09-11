"use client";

import { useGetCoupons } from "@/hooks/useGetCoupons";
import Loader from "@/ui/Loader";
import { useSearchParams } from "next/navigation";
import CouponsTable from "./CouponsTable";
import Pagination from "@/ui/Pagination";

function CouponsPageClient() {
  const searchParams = useSearchParams();
  const queries = searchParams.toString();
  const { isLoading, coupons, pagination } = useGetCoupons(queries);

  return (
    <div>
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

export default CouponsPageClient;
