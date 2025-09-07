"use client";

import BackButton from "@/ui/BackButton";
import { FaChevronRight } from "react-icons/fa6";
import { useParams } from "next/navigation";
import Loader from "@/ui/Loader";
import CouponForm from "../../_components/CouponForm";
import { useGetCoupon } from "@/hooks/useGetCoupons";

function EditCouponPage() {
  const params = useParams();
  const { couponId } = params;
  const { isLoading, coupon } = useGetCoupon(couponId);

  return (
    <div>
      <div className="mb-6 flex items-center gap-1 text-black md:gap-2">
        <BackButton>
          <FaChevronRight />
        </BackButton>

        <h2 className="text-lg font-bold">ویرایش کد تخفیف</h2>
      </div>

      {isLoading && <Loader />}

      {!isLoading && !coupon && (
        <div className="mt-4 flex items-center justify-center text-black">
          کد تخفیف ای یافت نشد.
        </div>
      )}

      {!isLoading && coupon && (
        <div>
          <CouponForm initialData={coupon} isUpdating />
        </div>
      )}
    </div>
  );
}
export default EditCouponPage;
