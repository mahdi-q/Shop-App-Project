import Link from "next/link";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/changeNumbers";
import TomanSvgIcon from "@/ui/TomanSvgIcon";
import AddToCartButton from "./AddToCartButton";
import Image from "next/image";
import LikeProductButton from "./LikeProductButton";

function ProductCard({ product }) {
  return (
    <div className="flex min-h-32 flex-col gap-1 rounded-lg border border-secondary-200 p-2 shadow-md">
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
        <div className="h-36 w-32 flex-shrink-0 overflow-hidden rounded-lg object-cover">
          <Link href={`/products/${product.slug}`} className="h-full w-full">
            <Image
              src={product.imageLink}
              alt="product-image"
              priority
              height={144}
              width={128}
              style={{ objectFit: "cover" }}
            />
          </Link>
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between">
        {/* Like Button */}
        <LikeProductButton
          id={product._id}
          isLiked={product.isLiked}
          likesCount={product.likesCount}
        />

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
