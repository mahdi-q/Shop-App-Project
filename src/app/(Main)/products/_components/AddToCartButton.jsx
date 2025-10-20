"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import useAddToCart from "@/hooks/useAddToCart";
import { usePathname } from "next/navigation";
import { useGetUserInfo } from "@/hooks/useGetUsers";
import CartActions from "app/(Main)/cart/_components/CartActions";

function AddToCartButton({ id }) {
  const pathname = usePathname();
  const { isAdding, addToCart } = useAddToCart();
  const { user, cart } = useGetUserInfo();

  const [quantity, setQuantity] = useState(0);
  const [isInCart, setIsInCart] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const found = cart?.productDetail.find((p) => p._id === id);

    if (found) {
      setIsInCart(true);
      setQuantity(found.quantity);
    } else {
      setIsInCart(false);
    }
  }, [cart, id]);

  const handleAddToCart = async () => {
    if (!user?.isActive) return toast.error("لطفا وارد حساب کاربری خود شوید.");

    try {
      const { message } = await addToCart({ productId: id });
      toast.success(message);
      setIsInCart(true);
    } catch (error) {
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
        <div className="flex items-stretch justify-between gap-4">
          <Link
            href="/cart"
            className="btn btn--primary block w-full rounded-lg text-center"
          >
            ادامه سفارش
          </Link>

          {pathname !== "/products" && pathname !== "/" && (
            <CartActions id={id} quantity={quantity} />
          )}
        </div>
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
