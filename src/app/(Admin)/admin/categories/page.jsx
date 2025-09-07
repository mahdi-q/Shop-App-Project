"use client";

import Loader from "@/ui/Loader";
import Link from "next/link";
import CategoriesTable from "./_components/CategoriesTable";
import { useGetCategories } from "@/hooks/useGetCategories";

function CategoriesPage() {
  const { isLoading, categories } = useGetCategories();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-bold text-black sm:text-lg lg:text-xl">
          لیست دسته‌بندی ها
        </h2>

        <Link
          href="/admin/categories/create"
          className="btn btn--outline text-primary-900 md:text-lg"
        >
          ایجاد دسته‌بندی جدید
        </Link>
      </div>

      {isLoading && <Loader />}

      {!isLoading && (!categories || categories.length <= 0) && (
        <div className="mt-4 flex items-center justify-center">
          دسته‌بندی ای یافت نشد.
        </div>
      )}

      {!isLoading && categories && categories.length > 0 && (
        <CategoriesTable
          categories={categories.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          )}
        />
      )}
    </div>
  );
}
export default CategoriesPage;
