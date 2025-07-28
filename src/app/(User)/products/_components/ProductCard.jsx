"use client";

import Link from "next/link";
import ButtonIcon from "@/ui/ButtonIcon";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/changeNumbers";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useState } from "react";
import useLikeProduct from "../_hooks/useLikeProduct";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useAddToCart from "../_hooks/useAddToCart";
import useUser from "@/hooks/useUser";
import TomanSvgIcon from "@/ui/TomanSvgIcon";

function ProductCard({ product }) {
  console.log(product);

  const { isLiking, likeProduct } = useLikeProduct();
  const { isAdding, addToCart } = useAddToCart();
  const { cart } = useUser();
  const router = useRouter();

  const isInCartInit = cart?.productDetail.find((p) => p._id === product._id);

  const [isLiked, setIsLiked] = useState(product.isLiked);
  const [isInCart, setIsInCart] = useState(isInCartInit);

  const handleLikeClick = async () => {
    try {
      const { message } = await likeProduct(product._id);
      toast.success(message);
      setIsLiked(!isLiked);
      router.refresh();
    } catch (error) {
      toast.error(error?.respone?.data?.message || "خطا در لایک کردن محصول");
    }
  };

  const handleAddToCart = async () => {
    try {
      const { message } = await addToCart({ productId: product._id });
      toast.success(message);
      setIsInCart(true);
      router.refresh();
    } catch (error) {
      toast.error(error?.respone?.data?.message || "خطا در افزودن به سبد خرید");
    }
  };

  return (
    <div className="min-h-32 rounded-lg border border-secondary-200 p-2 shadow-md">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div className="flex h-[-webkit-fill-available] flex-col justify-between gap-6">
          <div>
            <Link href={`/products/${product.slug}`}>
              <h3 className="mb-2 text-lg font-bold text-secondary-900 hover:text-primary-900">
                {product.title}
              </h3>
            </Link>

            <div className="flex flex-wrap items-center gap-1 text-xs text-secondary-500">
              <span className="badge badge--secondary">{product.brand}</span>
              <span className="badge badge--secondary">
                {product.category.title}
              </span>
            </div>
          </div>
        </div>

        <div className="h-36 w-28 overflow-hidden rounded-lg object-cover">
          <Link href={`/products/${product.slug}`}>
            <img
              className="h-full w-full"
              src={product.imageLink}
              alt="product-image"
            />
          </Link>
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between">
        <ButtonIcon
          onClick={handleLikeClick}
          varient="primary"
          disabled={isLiking}
        >
          {isLiked ? <AiFillLike /> : <AiOutlineLike />}
          <span>{toPersianNumbers(product.likesCount)}</span>
        </ButtonIcon>

        <div className="flex items-end gap-2">
          {product.discount !== 0 && (
            <span className="badge badge--success text-xs">
              {toPersianNumbers(product.discount)}%
            </span>
          )}

          <span className="flex flex-row-reverse gap-1 text-lg font-bold">
            <TomanSvgIcon />

            {toPersianNumbersWithComma(
              product.discount !== 0 ? product.offPrice : product.price,
            )}
          </span>
        </div>
      </div>

      <div>
        {isInCart ? (
          <Link
            href={"/cart"}
            className="btn btn--primary block w-full rounded-lg text-center text-sm"
          >
            ادامه سفارش
          </Link>
        ) : (
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="btn btn--primary w-full rounded-lg text-sm"
          >
            افزودن به سبد خرید
          </button>
        )}
      </div>
    </div>
  );
}
export default ProductCard;
