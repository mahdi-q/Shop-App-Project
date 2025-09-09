"use client";

import Loader from "@/ui/Loader";
import ProductsTable from "./_components/ProductsTable";
import Link from "next/link";
import { useGetProducts } from "@/hooks/useGetProducts";
import { useSearchParams } from "next/navigation";
import Pagination from "@/ui/Pagination";

function ProductsPage() {
  const searchParams = useSearchParams();
  const queries = searchParams.toString();
  const { isLoading, products, pagination } = useGetProducts(queries);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-bold text-black sm:text-lg lg:text-xl">
          لیست محصولات
        </h2>

        <Link
          href="/admin/products/create"
          className="btn btn--outline text-primary-900 md:text-lg"
        >
          ایجاد محصول جدید
        </Link>
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
