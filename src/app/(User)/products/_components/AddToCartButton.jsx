"use client";

import useUser from "@/hooks/useUser";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import useAddToCart from "@/hooks/useAddToCart";

function AddToCartButton({ id }) {
  const { isAdding, addToCart } = useAddToCart();
  const { user, cart } = useUser();

  const [isInCart, setIsInCart] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const found = cart?.productDetail.find((p) => p._id === id);
    if (found) setIsInCart(true);
  }, [cart, id]);

  const handleAddToCart = async () => {
    try {
      const { message } = await addToCart({ productId: id });
      toast.success(message);
      setIsInCart(true);
    } catch (error) {
      if (!user?.isActive)
        return toast.error("لطفا وارد حساب کاربری خود شوید.");
      toast.error(
        error?.response?.data?.message || "خطا در افزودن به سبد خرید",
      );
    }
  };

  if (!mounted)
    return (
      <button className="btn btn--primary w-full rounded-lg">
        افزودن به سبد خرید
      </button>
    );

  return (
    <div>
      {isInCart ? (
        <Link
          href="/cart"
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
