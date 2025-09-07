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
import { useGetPayment } from "@/hooks/useGetPayments";

function SinglePaymentPage() {
  const params = useParams();
  const { paymentId } = params;
  const { isLoading, payment } = useGetPayment(paymentId);

  return (
    <div>
      <div className="mb-6 flex items-center gap-1 md:gap-2">
        <BackButton>
          <FaChevronRight />
        </BackButton>

        <h2 className="text-lg font-bold">اطلاعات سفارش</h2>
      </div>

      {isLoading && <Loader />}

      {!isLoading && !payment && (
        <div className="mt-4 flex items-center justify-center">
          سفارشی ای یافت نشد.
        </div>
      )}

      {!isLoading && payment && (
        <div className="flex w-full flex-col gap-4 rounded-md border border-secondary-300 px-4 py-8 lg:gap-6 lg:px-6">
          <div className="flex flex-col gap-x-3 gap-y-2 text-base md:flex-row md:items-center lg:text-lg">
            <span className="whitespace-nowrap font-medium text-secondary-900">
              شماره فاکتور سفارش:
            </span>

            <span className="font-bold">{payment.invoiceNumber}</span>
          </div>

          <div className="flex flex-col gap-x-3 gap-y-2 text-base md:flex-row md:items-center lg:text-lg">
            <span className="whitespace-nowrap font-medium text-secondary-900">
              توضیحات سفارش:
            </span>

            <span className="font-bold">{payment.description}</span>
          </div>

          <div className="flex flex-col gap-x-3 gap-y-2 text-base md:flex-row md:items-center lg:text-lg">
            <span className="whitespace-nowrap font-medium text-secondary-900">
              اطلاعات کاربر:
            </span>

            <span className="font-bold">
              {payment.user.name} - {payment.user.email} -{" "}
              {toPersianNumbers(payment.user.phoneNumber)}
            </span>
          </div>

          <div className="flex flex-col gap-x-3 gap-y-2 text-base md:flex-row md:items-center lg:text-lg">
            <span className="whitespace-nowrap font-medium text-secondary-900">
              کد تخفیف سفارش:
            </span>

            {payment?.cart?.coupon ? (
              <Link href={`/admin/coupons/${payment.cart.coupon._id}`}>
                <span className="badge badge--success text-base font-bold">
                  {payment.cart.coupon.code}
                </span>
              </Link>
            ) : (
              <span className="font-bold">کد تخفیف نداشته است.</span>
            )}
          </div>

          <div className="flex flex-col gap-x-3 gap-y-2 text-base md:flex-row md:items-center lg:text-lg">
            <span className="whitespace-nowrap font-medium text-secondary-900">
              قیمت سفارش:
            </span>

            <span className="font-bold">
              {toPersianNumbersWithComma(payment.amount)} تومان
            </span>
          </div>

          <div className="flex flex-col gap-x-3 gap-y-2 text-base md:flex-row md:items-center lg:text-lg">
            <span className="whitespace-nowrap font-medium text-secondary-900">
              وضعیت پرداخت سفارش:
            </span>

            <div className="flex gap-2 md:items-center md:justify-center">
              <span className="font-bold leading-5">
                {payment.isPaid ? "پرداخت شده" : "پرداخت نشده"}
              </span>
              {payment.isPaid ? (
                <FaCircleCheck className="h-5 w-5 text-success" />
              ) : (
                <FaCircleXmark className="h-5 w-5 text-error" />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-x-3 gap-y-2 text-base md:flex-row md:items-center lg:text-lg">
            <span className="whitespace-nowrap font-medium text-secondary-900">
              وضعیت سفارش:
            </span>

            <div className="flex gap-2 md:items-center md:justify-center">
              <span className="font-bold leading-5">
                {payment.status === "COMPLETED" ? "تکمیل شده" : "تکمیل نشده"}
              </span>
              {payment.status === "COMPLETED" ? (
                <FaCircleCheck className="h-5 w-5 text-success" />
              ) : (
                <FaCircleXmark className="h-5 w-5 text-error" />
              )}
            </div>
          </div>

          <div className="flex flex-col gap-x-3 gap-y-2 text-base md:flex-row md:items-center lg:text-lg">
            <span className="whitespace-nowrap font-medium text-secondary-900">
              تاریخ ایجاد سفارش:
            </span>
            <span className="font-bold">{toLocalDate(payment.createdAt)}</span>
          </div>

          <div className="flex flex-col gap-3 text-base lg:text-lg">
            <span className="whitespace-nowrap font-medium text-secondary-900">
              محصولات سفارش:
            </span>

            <div className="flex max-w-[100%] flex-wrap items-center gap-x-2 gap-y-4">
              {payment.cart.productDetail.map((product, index) => (
                <Link key={index} href={`/admin/products/${product._id}`}>
                  <span className="badge badge--primary text-base">
                    {product.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default SinglePaymentPage;
