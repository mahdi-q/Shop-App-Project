"use client";

import BackButton from "@/ui/BackButton";
import Loader from "@/ui/Loader";
import toLocalDate from "@/utils/toLocalDate";
import { useParams } from "next/navigation";
import { FaChevronRight, FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/changeNumbers";
import Link from "next/link";
import { useGetCoupon } from "@/hooks/useGetCoupons";

function SingleCouponPage() {
  const params = useParams();
  const { couponId } = params;
  const { isLoading, coupon } = useGetCoupon(couponId);

  return (
    <div>
      <div className="mb-6 flex items-center gap-1 text-black md:gap-2">
        <BackButton>
          <FaChevronRight />
        </BackButton>

        <h2 className="text-lg font-bold">اطلاعات کد تخفیف</h2>
      </div>

      {isLoading && <Loader />}

      {!isLoading && !coupon && (
        <div className="mt-4 flex items-center justify-center text-black">
          کد تخفیف ای یافت نشد.
        </div>
      )}

      {!isLoading && coupon && (
        <div className="flex w-full flex-col gap-4 rounded-md border border-secondary-300 px-4 py-8 lg:gap-6 lg:px-6">
          <div className="flex items-center gap-3 text-base lg:text-lg">
            <span className="font-medium text-secondary-900">کد تخفیف:</span>

            <span className="font-bold text-black">{coupon.code}</span>
          </div>

          <div className="flex items-center gap-3 text-base lg:text-lg">
            <span className="font-medium text-secondary-900">وضعیت تخفیف:</span>

            <div className="flex items-center justify-center gap-2">
              <span className="font-bold leading-5 text-black">
                {coupon.isActive ? "فعال" : "غیر‌فعال"}
              </span>

              {coupon.isActive ? (
                <FaCircleCheck className="h-5 w-5 text-success" />
              ) : (
                <FaCircleXmark className="h-5 w-5 text-error" />
              )}
            </div>
          </div>

          <div className="flex items-center gap-3 text-base lg:text-lg">
            <span className="font-medium text-secondary-900">
              نوع کد تخفیف:
            </span>

            <span className="badge badge--primary text-base">
              {coupon.type === "percent" ? "درصدی" : "مقدار ثابت"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-base lg:text-lg">
            <span className="font-medium text-secondary-900">
              مقدار کد تخفیف:
            </span>

            <span className="font-bold text-black">
              {toPersianNumbersWithComma(coupon.amount)}{" "}
              {coupon.type === "percent" ? "درصد" : "تومان"}
            </span>
          </div>

          <div className="flex items-center gap-3 text-base lg:text-lg">
            <span className="font-medium text-secondary-900">
              مقدار مصرفی کد تخفیف:
            </span>

            <span className="font-bold text-black">
              {toPersianNumbers(coupon.usageCount)} عدد
            </span>
          </div>

          <div className="flex items-center gap-3 text-base lg:text-lg">
            <span className="font-medium text-secondary-900">
              ظرفیت کد تخفیف:
            </span>

            <span className="font-bold text-black">
              {toPersianNumbers(coupon.usageLimit)} عدد
            </span>
          </div>

          <div className="flex items-center gap-3 text-base lg:text-lg">
            <span className="font-medium text-secondary-900">
              تاریخ ایجاد کد تخفیف:
            </span>

            <span className="font-bold text-black">
              {toLocalDate(coupon.createdAt)}
            </span>
          </div>

          <div className="flex items-center gap-3 text-base lg:text-lg">
            <span className="font-medium text-secondary-900">
              تاریخ انقضا کد تخفیف:
            </span>

            <span className="font-bold text-black">
              {toLocalDate(coupon.expireDate)}
            </span>
          </div>

          <div className="flex items-center gap-3 text-base lg:text-lg">
            <span className="font-medium text-secondary-900">
              شامل محصولات:
            </span>

            <div className="flex max-w-[100%] flex-wrap items-center gap-x-2 gap-y-4">
              {coupon.productIds && coupon.productIds.length > 0 ? (
                coupon.productIds.map((item, index) => (
                  <Link key={index} href={`/admin/products/${item._id}`}>
                    <span className="badge badge--primary text-base">
                      {item.title ?? "نامشخص"}
                    </span>
                  </Link>
                ))
              ) : (
                <span className="whitespace-nowrap text-base font-bold text-black">
                  شامل محصولی نمی‌باشد.
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default SingleCouponPage;
