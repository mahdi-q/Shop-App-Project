import { getProductsApi } from "@/services/productsServices";
import ProductsList from "./_components/ProductsList";
import { Suspense } from "react";
import Loader from "@/ui/Loader";
import { cookies } from "next/headers";
import toStringCookies from "@/utils/toStringCookies";

export const metadata = {
  title: "محصولات",
  description: "صفحه محصولات اپلیکیشن فروشگاهی",
};

async function ProductsPage() {
  const cookieStore = cookies();
  const strCookies = toStringCookies(cookieStore);
  const { products } = await getProductsApi("", strCookies);

  return (
    <div className="px-4 lg:px-6">
      <h2 className="mb-6 font-bold text-black sm:text-lg lg:text-xl">
        لیست تمام محصولات
      </h2>

      <div className="grid h-screen grid-cols-12 gap-6">
        <div className="col-span-12 bg-error lg:col-span-3"></div>

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
