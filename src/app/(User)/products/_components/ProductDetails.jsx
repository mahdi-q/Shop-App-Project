import TomanSvgIcon from "@/ui/TomanSvgIcon";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/changeNumbers";
import AddToCartButton from "./AddToCartButton";
import Image from "next/image";

function ProductDetails({ product }) {
  return (
    <div className="relative mb-44 flex w-full flex-col items-start justify-between gap-8 md:flex-row-reverse">
      <div className="flex w-full flex-col gap-6 md:w-2/5">
        {/* Product Image */}
        <div className="relative h-[450px] overflow-hidden rounded-lg">
          <Image
            src={product.imageLink}
            alt="product-image"
            fill
            sizes="100%"
            priority
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="fixed bottom-0 left-0 w-full rounded-t-xl bg-secondary-50/70 px-4 py-6 md:relative md:bg-transparent md:px-0">
          {/* Product Price */}
          <div className="mb-6 flex items-center justify-between">
            <span className="text-xl font-bold">قیمت:</span>

            <div className="flex items-end gap-4">
              {product.discount !== 0 && (
                <span className="badge badge--success">
                  {toPersianNumbers(product.discount)}%
                </span>
              )}

              <span className="flex flex-row-reverse gap-1 text-3xl font-bold">
                <TomanSvgIcon />

                {toPersianNumbersWithComma(
                  product.discount !== 0 ? product.offPrice : product.price,
                )}
              </span>
            </div>
          </div>

          {/* Add To Cart Button */}
          <AddToCartButton id={product._id} />
        </div>
      </div>

      <div className="min-h-[450px] w-full rounded-lg bg-secondary-50/70 p-4 md:w-3/5">
        {/* Product Info */}
        <div className="mb-4 border-b border-b-secondary-400 pb-4">
          <h2 className="mb-6 text-3xl font-bold">{product.title}</h2>

          <div className="flex items-center gap-2 text-secondary-500">
            <span className="badge badge--secondary">{product.brand}</span>
            <span className="badge badge--secondary">
              {product.category.title}
            </span>
          </div>
        </div>

        {/* Product description */}
        <div>
          <h3 className="mb-4 text-xl font-bold">توضیحات:</h3>
          <p className="text-lg font-medium">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
export default ProductDetails;
