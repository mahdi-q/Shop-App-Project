import ImageCover from "@/components/ImageCover";
import { useGetProduct } from "@/hooks/useGetProducts";
import Loader from "@/ui/Loader";
import TomanSvgIcon from "@/ui/TomanSvgIcon";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/changeNumbers";
import Link from "next/link";

function UserLikedProduct({ productId }) {
  const { isLoading, product } = useGetProduct(productId);

  return (
    <div>
      {isLoading && <Loader />}

      {!isLoading && !product && null}

      {!isLoading && product && (
        <div className="flex min-h-32 flex-col gap-1 rounded-lg border border-secondary-200 p-2 shadow-md">
          <div className="flex items-start justify-between gap-4">
            {/* Product Info */}
            <div className="flex h-[-webkit-fill-available] flex-col justify-between gap-6">
              <div className="mb-2 flex h-full flex-col justify-between">
                {/* Product Title */}
                <div>
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="mb-2 text-lg font-bold text-secondary-900 hover:text-primary-900">
                      {product.title}
                    </h3>
                  </Link>
                  <div className="flex flex-wrap items-center gap-1 text-xs text-secondary-500">
                    <span className="badge badge--secondary">
                      {product.brand}
                    </span>
                    <span className="badge badge--secondary">
                      {product.category.title}
                    </span>
                  </div>
                </div>

                {/* Product Price */}
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

            {/* Product Image */}
            <div className="relative h-36 w-32 flex-shrink-0 overflow-hidden rounded-lg border border-secondary-200 object-cover">
              <Link
                href={`/products/${product.slug}`}
                className="h-full w-full"
              >
                <ImageCover src={product.imageLink} fill />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserLikedProduct;
