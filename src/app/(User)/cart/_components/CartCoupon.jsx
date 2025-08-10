import { useEffect, useState } from "react";
import useAddCouponToCart from "../_hooks/useAddCouponToCart";
import useRemoveCouponFromCart from "../_hooks/useRemoveCouponFromCart";
import toast from "react-hot-toast";
import { IoTrashOutline } from "react-icons/io5";

function CartCoupon({ cart }) {
  const { isAdding, addCouponToCart } = useAddCouponToCart();
  const { isRemoving, removeCouponFromCart } = useRemoveCouponFromCart();

  const [hasCoupon, setHasCoupon] = useState(!!cart.coupon ?? false);
  const [isValide, setIsValide] = useState(!!cart.coupon ?? false);
  const [coupon, setCoupon] = useState(cart.coupon?.code ?? "");

  useEffect(() => {
    if (!cart.coupon) {
      setHasCoupon(false);
      setIsValide(false);
      setCoupon("");
    }
  }, [cart.coupon]);

  const handleSubmitCoupon = async () => {
    try {
      const { message } = await addCouponToCart({ couponCode: coupon });
      setIsValide(true);
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطا در ثبت کد تخفیف");
    }
  };
  const handleDeleteCoupon = async () => {
    try {
      const { message } = await removeCouponFromCart();
      setIsValide(false);
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطا در حذف کد تخفیف");
    }
  };

  return (
    <div>
      {hasCoupon ? (
        <div className="flex w-full items-center justify-between gap-2 rounded-lg border border-secondary-100 p-2 pr-3">
          <input
            className="flex-1 border-none py-1 outline-none disabled:font-medium disabled:text-secondary-800"
            type="text"
            value={coupon}
            disabled={isValide}
            onChange={(e) => setCoupon(e.target.value)}
            placeholder="کد تخفیف را وارد کنید"
          />

          {isValide ? (
            <button
              onClick={handleDeleteCoupon}
              disabled={isRemoving}
              className="btn btn--danger rounded-md px-3 py-2 text-sm"
            >
              <IoTrashOutline className="h-6 w-6" />
            </button>
          ) : (
            <button
              onClick={handleSubmitCoupon}
              disabled={isAdding}
              className="btn btn--primary rounded-md px-3 py-2 text-sm"
            >
              اعمال کد
            </button>
          )}
        </div>
      ) : (
        <button
          onClick={() => setHasCoupon(true)}
          className="text-sm font-medium text-primary-900"
        >
          آیا کد تخفیف دارید؟
        </button>
      )}
    </div>
  );
}
export default CartCoupon;
