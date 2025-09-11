"use client";

import useAddToCart from "@/hooks/useAddToCart";
import useRemoveFromCart from "@/hooks/useRemoveFromCart";
import { toPersianNumbers } from "@/utils/changeNumbers";
import toast from "react-hot-toast";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";

function CartActions({ id, quantity }) {
  const { isAdding, addToCart } = useAddToCart();
  const { isRemoving, removeFromCart } = useRemoveFromCart();

  const handleAddToCart = async (id) => {
    try {
      const { message } = await addToCart({ productId: id });
      toast.success(message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "خطا در افزودن به سبد خرید",
      );
    }
  };
  const handleRemoveFromCart = async (id) => {
    try {
      const { message } = await removeFromCart({ productId: id });
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطا در حذف از سبد خرید");
    }
  };

  return (
    <div className="flex items-stretch gap-2 rounded-lg border border-secondary-300 p-2">
      <button
        onClick={() => handleAddToCart(id)}
        disabled={isAdding}
        className="hover:text-success"
      >
        <CiCirclePlus className="h-6 w-6" />
      </button>

      <span className="border-b border-b-secondary-900 px-2 font-bold">
        {toPersianNumbers(quantity)}
      </span>

      <button
        onClick={() => handleRemoveFromCart(id)}
        disabled={isRemoving}
        className="hover:text-error"
      >
        <CiCircleMinus className="h-6 w-6" />
      </button>
    </div>
  );
}
export default CartActions;
