import { notFound } from "next/navigation";
import ProductCard from "./ProductCard";
import { getProductsApi } from "@/services/productsServices";
import { cookies } from "next/headers";
import toStringCookies from "@/utils/toStringCookies";
import { use } from "react";
import queryString from "query-string";

async function ProductsList({ searchParams }) {
  const cookieStore = await cookies();
  const strCookies = toStringCookies(cookieStore);

  const { products } = await getProductsApi(
    queryString.stringify(await searchParams),
    strCookies,
  );

  if (!products || products.length <= 0) return notFound();

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
export default ProductsList;
