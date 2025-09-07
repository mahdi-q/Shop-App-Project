"use client";

import { useGetCategory } from "@/hooks/useGetCategories";
import BackButton from "@/ui/BackButton";
import Loader from "@/ui/Loader";
import toLocalDate from "@/utils/toLocalDate";
import { useParams } from "next/navigation";
import { FaChevronRight } from "react-icons/fa6";

function SingleCategoryPage() {
  const params = useParams();
  const { categoryId } = params;
  const { isLoading, category } = useGetCategory(categoryId);

  return (
    <div>
      <div className="mb-6 flex items-center gap-1 md:gap-2">
        <BackButton>
          <FaChevronRight />
        </BackButton>

        <h2 className="text-lg font-bold">اطلاعات دسته‌بندی</h2>
      </div>

      {isLoading && <Loader />}

      {!isLoading && !category && (
        <div className="mt-4 flex items-center justify-center">
          دسته‌بندی‌ ای یافت نشد.
        </div>
      )}

      {!isLoading && category && (
        <div className="flex w-full flex-col gap-4 rounded-md border border-secondary-300 px-4 py-8 lg:gap-6 lg:px-6">
          <div className="flex items-center gap-3 text-base lg:text-lg">
            <span className="font-medium text-secondary-900">
              عنوان دسته‌بندی‌:
            </span>
            <span className="font-bold"> {category.title}</span>
          </div>

          <div className="flex items-center gap-3 text-base lg:text-lg">
            <span className="font-medium text-secondary-900">
              عنوان انگلیسی دسته‌بندی‌:
            </span>
            <span className="font-bold"> {category.englishTitle}</span>
          </div>

          <div className="flex items-center gap-3 text-base lg:text-lg">
            <span className="font-medium text-secondary-900">
              توضیحات دسته‌بندی‌:
            </span>
            <span className="font-bold"> {category.description}</span>
          </div>

          <div className="flex items-center gap-3 text-base lg:text-lg">
            <span className="font-medium text-secondary-900">
              تاریخ ایجاد دسته‌بندی‌:
            </span>
            <span className="font-bold">{toLocalDate(category.createdAt)}</span>
          </div>

          <div className="flex items-center gap-3 text-base lg:text-lg">
            <span className="font-medium text-secondary-900">
              نوع دسته‌بندی‌:
            </span>

            <span className="badge badge--primary text-base">
              {category.type}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
export default SingleCategoryPage;
