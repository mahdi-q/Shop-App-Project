"use client";

import BackButton from "@/ui/BackButton";
import { FaChevronRight } from "react-icons/fa6";
import { useParams } from "next/navigation";
import Loader from "@/ui/Loader";
import useGetCategory from "../../_hooks/useGetCategory";
import CategoryForm from "../../_components/CategoryForm";

function EditProductPage() {
  const params = useParams();
  const { categoryId } = params;
  const { isLoading, category } = useGetCategory(categoryId);

  return (
    <div>
      <div className="mb-6 flex items-center gap-1 md:gap-2">
        <BackButton>
          <FaChevronRight />
        </BackButton>

        <h2 className="text-lg font-bold">
          ادیت دسته‌بندی "{category?.title ?? ""}"
        </h2>
      </div>

      {isLoading && <Loader />}

      {!isLoading && !category && (
        <div className="mt-4 flex items-center justify-center">
          دسته‌بندی ای یافت نشد.
        </div>
      )}

      {!isLoading && category && (
        <div>
          <CategoryForm initialData={category} isUpdating />
        </div>
      )}
    </div>
  );
}
export default EditProductPage;
