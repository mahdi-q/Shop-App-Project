"use client";

import Loader from "@/ui/Loader";
import ProductsTable from "./_components/ProductsTable";
import Link from "next/link";
import { useGetProducts } from "@/hooks/useGetProducts";
import { useSearchParams } from "next/navigation";
import Pagination from "@/ui/Pagination";
import SearchBox from "@/ui/SearchBox";
import SortButton from "@/ui/SortButton";

function ProductsPage() {
  const searchParams = useSearchParams();
  const queries = searchParams.toString();
  const { isLoading, products, pagination } = useGetProducts(queries);

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-black sm:text-lg lg:text-xl">
            لیست محصولات
          </h2>

          <Link
            href="/admin/products/create"
            className="btn btn--outline leading-5 text-primary-900 md:hidden"
          >
            ایجاد محصول جدید
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
            href="/admin/products/create"
            className="btn btn--outline hidden leading-5 text-primary-900 md:block"
          >
            ایجاد محصول جدید
          </Link>
        </div>
      </div>

      {isLoading && <Loader />}

      {!isLoading && (!products || products.length <= 0) && (
        <div className="mt-4 flex items-center justify-center">
          محصولی یافت نشد.
        </div>
      )}

      {!isLoading && products && products.length > 0 && (
        <ProductsTable products={products} />
      )}

      {!isLoading && products && products.length > 0 && (
        <div className="mt-6 flex items-center justify-center">
          <Pagination pagination={pagination} />
        </div>
      )}
    </div>
  );
}
export default ProductsPage;
