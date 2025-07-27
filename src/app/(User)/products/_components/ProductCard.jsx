"use client";

import Link from "next/link";
import ButtonIcon from "@/ui/ButtonIcon";
import { toPersianNumbers } from "@/utils/changeNumbers";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { useState } from "react";
import useLikeProduct from "../_hooks/useLikeProduct";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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

  const handleAddToCart = () => {};

  return (
    <div className="min-h-32 rounded-lg border border-secondary-200 p-2 shadow-md">
      <div className="mb-3 flex items-start justify-between gap-4">
        <div className="flex h-[-webkit-fill-available] flex-col justify-between">
          <div>
            <Link href={`/products/${product.slug}`}>
              <h3 className="mb-2 text-lg font-bold text-secondary-900">
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

          <div>
            <ButtonIcon
              onClick={handleLikeClick}
              varient="primary"
              disabled={isLiking}
            >
              {isLiked ? <AiFillLike /> : <AiOutlineLike />}
              <span>{toPersianNumbers(product.likesCount)}</span>
            </ButtonIcon>
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

      <button
        onClick={handleAddToCart}
        className="btn btn--primary w-full rounded-lg text-sm"
      >
        افزودن به سبد خرید
      </button>
    </div>
  );
}
export default ProductCard;
