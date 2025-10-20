import Link from "next/link";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/changeNumbers";
import TomanSvgIcon from "@/ui/TomanSvgIcon";
import AddToCartButton from "./AddToCartButton";
import LikeProductButton from "./LikeProductButton";
import ImageCover from "@/components/ImageCover";

function ProductCard({ product }) {
  return (
    <div className="flex min-h-32 flex-col justify-between rounded-lg border border-secondary-200 p-2 shadow-md">
      <div className="mb-4 flex items-start justify-between gap-4">
        {/* Product Info */}
        <div className="flex h-[-webkit-fill-available] flex-col justify-between gap-6">
          <div>
            <Link href={`/products/${product.slug}`}>
              <h3 className="mb-2 text-lg font-bold text-secondary-900 transition-all duration-200 hover:text-primary-900">
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
        <div className="relative h-36 w-32 flex-shrink-0 overflow-hidden rounded-lg border border-secondary-200 bg-[#fff] object-cover">
          <Link href={`/products/${product.slug}`} className="h-full w-full">
            <ImageCover src={product.imageLinkUrl} fill />
          </Link>
        </div>
      </div>

      <div>
        <div className="mb-4 flex items-end justify-between">
          {/* Like Button */}
          <LikeProductButton
            id={product._id}
            isLiked={product.isLiked}
            likesCount={product.likesCount}
          />

          {/* Product Price */}
          <div className="flex flex-col items-end gap-1">
            {product.discount !== 0 && (
              <span className="text-secondary-400 line-through">
                {toPersianNumbersWithComma(product.price)} تومان
              </span>
            )}

            <div className="flex items-end gap-2">
              {product.discount !== 0 && (
                <span className="badge badge--success text-xs">
                  {toPersianNumbers(product.discount)}%
                </span>
              )}

              <span className="flex flex-row-reverse gap-1 text-lg font-bold text-black">
                <TomanSvgIcon />

                {toPersianNumbersWithComma(
                  product.discount !== 0 ? product.offPrice : product.price,
                )}
              </span>
            </div>
          </div>
        </div>

        {/* Add To Cart Button */}
        <AddToCartButton id={product._id} />
      </div>
    </div>
  );
}
export default ProductCard;
