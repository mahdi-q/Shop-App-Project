"use client";

import Loader from "@/ui/Loader";
import useGetProducts from "./_hooks/useGetProducts";
import ProductsTable from "./_components/ProductsTable";
import Link from "next/link";

function ProductsPage() {
  const { isLoading, products } = useGetProducts();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between font-bold sm:text-lg lg:text-xl">
        <h2 className="text-black">لیست محصولات</h2>

        <Link
          href="/products/create"
          className="btn btn--outline text-primary-900"
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
    </div>
  );
}
export default ProductsPage;
