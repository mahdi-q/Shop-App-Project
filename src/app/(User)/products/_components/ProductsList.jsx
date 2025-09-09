import ProductCard from "./ProductCard";
import { getProductsApi } from "@/services/productsServices";
import { cookies } from "next/headers";
import toStringCookies from "@/utils/toStringCookies";
import queryString from "query-string";

async function ProductsList({ searchParams }) {
  const cookieStore = await cookies();
  const strCookies = toStringCookies(cookieStore);

  const { products } = await getProductsApi(
    queryString.stringify(await searchParams),
    strCookies,
  );

  if (!products || products.length <= 0)
    return (
      <span className="text-center text-lg text-black">محصولی یافت نشد.</span>
    );

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
export default ProductsList;
