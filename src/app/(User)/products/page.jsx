import ProductsList from "./_components/ProductsList";
import { Suspense } from "react";
import Loader from "@/ui/Loader";
import ProductsSidebar from "./_components/ProductsSidebar";
import SearchBox from "@/ui/SearchBox";

export const metadata = {
  title: "محصولات",
  description: "صفحه محصولات اپلیکیشن فروشگاهی",
};

export const revalidate = 600;

export const experimental_ppr = true;

function ProductsPage({ searchParams }) {
  return (
    <div className="px-4 lg:px-6">
      <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <h2 className="font-bold text-black sm:text-lg lg:text-xl">
          لیست تمام محصولات
        </h2>

        <div className="flex-1 md:max-w-[400px]">
          <SearchBox />
        </div>
      </div>

      <div className="mb-24 grid grid-cols-12 gap-6">
        <div className="col-span-12 h-fit min-h-[400px] rounded-md bg-secondary-50/70 py-4 pr-6 lg:col-span-3 lg:ml-4">
          <Suspense fallback={<Loader />}>
            <ProductsSidebar />
          </Suspense>
        </div>

        <div className="col-span-12 lg:col-span-9">
          <Suspense fallback={<Loader />}>
            <ProductsList searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
export default ProductsPage;
