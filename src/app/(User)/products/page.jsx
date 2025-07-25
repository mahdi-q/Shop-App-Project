import { getProductsApi } from "@/services/productsServices";
import ProductsList from "./_components/ProductsList";
import { Suspense } from "react";
import Loader from "@/ui/Loader";
import { cookies } from "next/headers";
import toStringCookies from "@/utils/toStringCookies";
import ProductsSidebar from "./_components/ProductsSidebar";
import { getCategoriesApi } from "@/services/categoriesServices";
import queryString from "query-string";

export const metadata = {
  title: "محصولات",
  description: "صفحه محصولات اپلیکیشن فروشگاهی",
};

async function ProductsPage({ searchParams }) {
  const cookieStore = cookies();
  const strCookies = toStringCookies(cookieStore);

  const productsPromise = getProductsApi(
    queryString.stringify(searchParams),
    strCookies,
  );
  const categoriesPromise = getCategoriesApi();

  const [{ products }, { categories }] = await Promise.all([
    productsPromise,
    categoriesPromise,
  ]);

  return (
    <div className="px-4 lg:px-6">
      <h2 className="mb-6 font-bold text-black sm:text-lg lg:text-xl">
        لیست تمام محصولات
      </h2>

      <div className="mb-24 grid grid-cols-12 gap-6">
        <div className="col-span-12 h-fit min-h-[400px] rounded-md bg-secondary-50/70 py-4 pr-6 lg:col-span-3 lg:ml-4">
          <ProductsSidebar categories={categories} />
        </div>

        <div className="col-span-12 lg:col-span-9">
          <Suspense fallback={<Loader />}>
            <ProductsList products={products} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
export default ProductsPage;
