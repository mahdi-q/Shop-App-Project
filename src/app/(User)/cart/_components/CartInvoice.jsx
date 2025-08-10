"use client";

import useUser from "@/hooks/useUser";
import Loader from "@/ui/Loader";
import { toPersianNumbersWithComma } from "@/utils/changeNumbers";
import toast from "react-hot-toast";
import useCreatePayment from "../_hooks/useCreatePayment";
import CartCoupon from "./CartCoupon";

function CartInvoice() {
  const { isLoading, user, cart } = useUser();
  const { isCreating, createPayment } = useCreatePayment();

  const handleCompleteOrder = async () => {
    try {
      const { message } = await createPayment();
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطا در تکمیل سفارش");
    }
  };

  if (isLoading) return <Loader />;
  if (!user.isActive) return null;

  return (
    <div className="space-y-6 rounded-lg border border-secondary-300 p-4">
      <h3 className="text-lg font-bold lg:text-xl">فاکتور خرید شما</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-secondary-700 lg:text-lg">مجموع سفارش:</span>
          <span className="font-bold text-black lg:text-lg">
            {toPersianNumbersWithComma(cart.payDetail.totalGrossPrice)} تومان
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-secondary-700 lg:text-lg">تخفیف:</span>
          <span className="font-bold text-black lg:text-lg">
            {toPersianNumbersWithComma(cart.payDetail.totalOffAmount)} تومان
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-secondary-700 lg:text-lg">
            مبلغ پرداختی شما:
          </span>
          <span className="font-bold text-black lg:text-lg">
            {toPersianNumbersWithComma(cart.payDetail.totalPrice)} تومان
          </span>
        </div>
      </div>

      <CartCoupon cart={cart} />

      <button
        onClick={handleCompleteOrder}
        disabled={isCreating}
        className="btn btn--primary w-full py-4"
      >
        تکمیل سفارش
      </button>
    </div>
  );
}
export default CartInvoice;
