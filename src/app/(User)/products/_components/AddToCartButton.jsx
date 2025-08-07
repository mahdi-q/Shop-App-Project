"use client";

import useUser from "@/hooks/useUser";
import useAddToCart from "../_hooks/useAddToCart";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function AddToCartButton() {
  const { isAdding, addToCart } = useAddToCart();
  const router = useRouter();
  const { user, cart } = useUser();

  const isInCartInit = cart?.productDetail.find((p) => p._id === product._id);

  const [isInCart, setIsInCart] = useState(isInCartInit);

  const handleAddToCart = async () => {
    try {
      const { message } = await addToCart({ productId: product._id });
      toast.success(message);
      setIsInCart(true);
      router.refresh();
    } catch (error) {
      if (!user.isActive) return toast.error("لطفا وارد حساب کاربری خود شوید.");
      toast.error(error?.respone?.data?.message || "خطا در افزودن به سبد خرید");
    }
  };

  return (
    <div>
      {isInCart ? (
        <Link
          href={"/cart"}
          className="btn btn--primary block w-full rounded-lg text-center"
        >
          ادامه سفارش
        </Link>
      ) : (
        <button
          onClick={handleAddToCart}
          disabled={isAdding}
          className="btn btn--primary w-full rounded-lg"
        >
          افزودن به سبد خرید
        </button>
      )}
    </div>
  );
}
export default AddToCartButton;
