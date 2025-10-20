import TomanSvgIcon from "@/ui/TomanSvgIcon";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/changeNumbers";
import AddToCartButton from "./AddToCartButton";
import ImageCover from "@/components/ImageCover";

function ProductDetails({ product }) {
  return (
    <div className="relative mb-44 flex w-full flex-col items-start justify-between gap-8 text-black md:flex-row-reverse">
      <div className="flex w-full flex-col gap-6 md:w-2/5">
        {/* Product Image */}
        <div className="relative h-[450px] overflow-hidden rounded-lg border border-secondary-200 bg-[#fff]">
          <ImageCover src={product.imageLinkUrl} fill priority />
        </div>

        <div className="fixed bottom-0 left-0 w-full rounded-t-xl bg-secondary-50/70 px-4 py-6 md:relative md:bg-transparent md:px-0">
          {/* Product Price */}
          <div className="mb-6 flex items-start justify-between">
            <span className="text-xl font-bold">قیمت:</span>

            <div className="flex flex-col items-end gap-2">
              {product.discount !== 0 && (
                <span className="text-lg text-secondary-400 line-through">
                  {toPersianNumbersWithComma(product.price)} تومان
                </span>
              )}

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
          </div>

          {/* Add To Cart Button */}
          <AddToCartButton id={product._id} />
        </div>
      </div>

      <div className="min-h-[450px] w-full rounded-lg bg-primary-100/60 p-6 md:w-3/5 dark:bg-primary-100/20">
        {/* Product Info */}
        <div className="mb-4 space-y-4 border-b border-b-secondary-400 pb-4">
          <h2 className="mb-6 text-3xl font-bold">{product.title}</h2>

          <div className="flex items-center gap-4 text-secondary-600">
            <span>دسته‌بندی : {product.category.title}</span>
            <span>/</span>
            <span>برند : {product.brand}</span>
          </div>

          <div className="flex items-center gap-2 text-secondary-600">
            <span>تگ‌ ها :</span>
            {product.tags.map((tag, index) => (
              <span key={index} className="badge badge--primary">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Product description */}
        <div>
          <h3 className="mb-4 text-xl font-bold">توضیحات:</h3>
          <p className="whitespace-pre-line text-lg">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
export default ProductDetails;
