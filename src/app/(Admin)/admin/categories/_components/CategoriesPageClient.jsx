"use client";

import { useGetCategories } from "@/hooks/useGetCategories";
import Loader from "@/ui/Loader";
import { useSearchParams } from "next/navigation";
import CategoriesTable from "./CategoriesTable";
import Pagination from "@/ui/Pagination";

function CategoriesPageClient() {
  const searchParams = useSearchParams();
  const queries = searchParams.toString();
  const { isLoading, categories, pagination } = useGetCategories(queries);

  return (
    <div>
      {isLoading && <Loader />}

      {!isLoading && (!categories || categories.length <= 0) && (
        <div className="mt-4 flex items-center justify-center text-black">
          دسته‌بندی ای یافت نشد.
        </div>
      )}

      {!isLoading && categories && categories.length > 0 && (
        <CategoriesTable categories={categories} />
      )}

      {!isLoading && categories && categories.length > 0 && (
        <div className="mt-6 flex items-center justify-center">
          <Pagination pagination={pagination} />
        </div>
      )}
    </div>
  );
}

export default CategoriesPageClient;
