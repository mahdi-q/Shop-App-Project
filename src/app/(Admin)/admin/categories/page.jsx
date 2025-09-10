"use client";

import Loader from "@/ui/Loader";
import Link from "next/link";
import CategoriesTable from "./_components/CategoriesTable";
import { useGetCategories } from "@/hooks/useGetCategories";
import { useSearchParams } from "next/navigation";
import Pagination from "@/ui/Pagination";
import SearchBox from "@/ui/SearchBox";
import SortButton from "@/ui/SortButton";

function CategoriesPage() {
  const searchParams = useSearchParams();
  const queries = searchParams.toString();
  const { isLoading, categories, pagination } = useGetCategories(queries);

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-black sm:text-lg lg:text-xl">
            لیست دسته‌بندی ها
          </h2>

          <Link
            href="/admin/categories/create"
            className="btn btn--outline leading-5 text-primary-900 md:hidden"
          >
            ایجاد دسته‌بندی جدید
          </Link>
        </div>

        <div className="flex max-w-[700px] flex-1 items-center gap-x-2 xl:gap-x-4">
          <div className="flex-1">
            <SearchBox />
          </div>

          <div>
            <SortButton />
          </div>

          <Link
            href="/admin/categories/create"
            className="btn btn--outline hidden leading-5 text-primary-900 md:block"
          >
            ایجاد دسته‌بندی جدید
          </Link>
        </div>
      </div>

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
export default CategoriesPage;
