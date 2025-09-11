"use client";

import { useGetProducts } from "@/hooks/useGetProducts";
import Loader from "@/ui/Loader";
import { useSearchParams } from "next/navigation";
import ProductsTable from "./ProductsTable";
import Pagination from "@/ui/Pagination";

function ProductsPageClient() {
  const searchParams = useSearchParams();
  const queries = searchParams.toString();
  const { isLoading, products, pagination } = useGetProducts(queries);

  return (
    <div>
      {isLoading && <Loader />}

      {!isLoading && (!products || products.length <= 0) && (
        <div className="mt-4 flex items-center justify-center text-black">
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

export default ProductsPageClient;
