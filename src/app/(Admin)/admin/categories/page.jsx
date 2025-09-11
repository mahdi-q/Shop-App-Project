import Loader from "@/ui/Loader";
import Link from "next/link";
import SearchBox from "@/ui/SearchBox";
import SortButton from "@/ui/SortButton";
import { Suspense } from "react";
import CategoriesPageClient from "./_components/CategoriesPageClient";

function CategoriesPage() {
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
            <Suspense fallback={<Loader />}>
              <SearchBox />
            </Suspense>
          </div>

          <div>
            <Suspense fallback={<Loader />}>
              <SortButton />
            </Suspense>
          </div>

          <Link
            href="/admin/categories/create"
            className="btn btn--outline hidden leading-5 text-primary-900 md:block"
          >
            ایجاد دسته‌بندی جدید
          </Link>
        </div>
      </div>
      
      <Suspense fallback={<Loader />}>
        <CategoriesPageClient />
      </Suspense>
    </div>
  );
}
export default CategoriesPage;
