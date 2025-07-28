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
import AddToCartButton from "./AddToCartButton";

function ProductCard({ product }) {
  const { isLiking, likeProduct } = useLikeProduct();
  const router = useRouter();

  const [isLiked, setIsLiked] = useState(product.isLiked);

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

  return (
    <div className="min-h-32 rounded-lg border border-secondary-200 p-2 shadow-md">
      <div className="mb-3 flex items-start justify-between gap-4">
        {/* Product Info */}
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

        {/* Product Image */}
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
        {/* Like Button */}
        <ButtonIcon
          onClick={handleLikeClick}
          varient="primary"
          disabled={isLiking}
        >
          {isLiked ? <AiFillLike /> : <AiOutlineLike />}
          <span>{toPersianNumbers(product.likesCount)}</span>
        </ButtonIcon>

        {/* Product Price */}
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

      {/* Add To Cart Button */}
      <AddToCartButton />
    </div>
  );
}
export default ProductCard;
