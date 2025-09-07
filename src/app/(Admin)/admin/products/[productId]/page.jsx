"use client";

import BackButton from "@/ui/BackButton";
import Loader from "@/ui/Loader";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/changeNumbers";
import toLocalDate from "@/utils/toLocalDate";
import { useParams } from "next/navigation";
import { FaChevronRight } from "react-icons/fa6";
import MultipleBadge from "../_components/MultipleBadge";
import ImageCover from "@/components/ImageCover";
import { useGetProduct } from "@/hooks/useGetProducts";

function SingleProductPage() {
  const params = useParams();
  const { productId } = params;
  const { isLoading, product } = useGetProduct(productId);

  return (
    <div>
      <div className="mb-6 flex items-center gap-1 md:gap-2">
        <BackButton>
          <FaChevronRight />
        </BackButton>

        <h2 className="text-lg font-bold">اطلاعات محصول</h2>
      </div>

      {isLoading && <Loader />}

      {!isLoading && !product && (
        <div className="mt-4 flex items-center justify-center">
          محصولی یافت نشد.
        </div>
      )}

      {!isLoading && product && (
        <div className="flex w-full flex-col-reverse justify-between gap-6 rounded-md border border-secondary-300 p-4 lg:p-6 xl:flex-row xl:gap-2">
          <div className="mt-2 flex flex-col gap-4 px-2 lg:gap-6">
            <div className="flex items-center gap-3 text-base lg:text-lg">
              <span className="font-medium text-secondary-900">
                عنوان محصول:
              </span>
              <span className="font-bold"> {product.title}</span>
            </div>

            <div className="flex items-center gap-3 text-base lg:text-lg">
              <span className="font-medium text-secondary-900">
                برند محصول:
              </span>
              <span className="font-bold"> {product.brand}</span>
            </div>

            <div className="flex items-center gap-3 text-base lg:text-lg">
              <span className="font-medium text-secondary-900">
                دسته‌بندی محصول:
              </span>
              <span className="font-bold"> {product.category.title}</span>
            </div>

            <div className="flex items-center gap-3 text-base lg:text-lg">
              <span className="font-medium text-secondary-900">
                توضیحات محصول:
              </span>
              <span className="font-bold"> {product.description}</span>
            </div>

            <div className="flex items-center gap-3 text-base lg:text-lg">
              <span className="font-medium text-secondary-900">
                تخفیف محصول:
              </span>
              <span className="font-bold">
                {toPersianNumbers(product.discount)} درصد
              </span>
            </div>

            <div className="flex items-center gap-3 text-base lg:text-lg">
              <span className="font-medium text-secondary-900">
                قیمت نهایی محصول:
              </span>
              <span className="font-bold">
                {toPersianNumbersWithComma(product.offPrice)} تومان
              </span>
            </div>

            <div className="flex items-center gap-3 text-base lg:text-lg">
              <span className="font-medium text-secondary-900">
                موجودی محصول:
              </span>
              <span className="font-bold">
                {toPersianNumbers(product.countInStock)} عدد
              </span>
            </div>

            <div className="flex items-center gap-3 text-base lg:text-lg">
              <span className="font-medium text-secondary-900">
                تاریخ ایجاد محصول:
              </span>
              <span className="font-bold">
                {toLocalDate(product.createdAt)}
              </span>
            </div>

            <div className="flex flex-col gap-3 text-base lg:text-lg">
              <span className="font-medium text-secondary-900">
                کاربرانی که این محصول را لایک کرده‌اند:
              </span>

              <div className="flex max-w-[100%] flex-wrap items-center gap-x-2 gap-y-4 xl:max-w-[70%]">
                {product.likes && product.likes.length > 0 ? (
                  product.likes.map((item) => (
                    <MultipleBadge key={item} userId={item} />
                  ))
                ) : (
                  <span className="whitespace-nowrap text-base font-bold">
                    کاربری این محصول را لایک نکرده است.
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 text-base lg:text-lg">
              <span className="font-medium text-secondary-900">
                تگ های محصول:
              </span>

              <div className="flex max-w-[100%] flex-wrap items-center gap-x-2 gap-y-4">
                {product.tags && product.tags.length > 0 ? (
                  product.tags.map((item, index) => (
                    <span
                      key={index}
                      className="badge badge--primary text-base"
                    >
                      {item ?? "نامشخص"}
                    </span>
                  ))
                ) : (
                  <span className="whitespace-nowrap text-base font-bold">
                    محصول تگی ندارد.
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex h-[500px] flex-shrink-0 self-center overflow-hidden rounded-lg border border-secondary-200 lg:w-[450px] xl:self-start">
            <ImageCover src={product?.imageLink} width={450} height={500} />
          </div>
        </div>
      )}
    </div>
  );
}
export default SingleProductPage;
