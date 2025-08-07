import { getProductBySlugApi } from "@/services/productsServices";
import ProductDetails from "../_components/ProductDetails";
import { notFound } from "next/navigation";

export const metadata = {
  title: "جزئیات محصول",
  description: "صفحه جزئیات محصول اپلیکیشن فروشگاهی",
};

export const revalidate = 3600;

async function ProductItemPage({ params }) {
  const { product } = await getProductBySlugApi((await params).slug);

  if (!product) return notFound();

  return <ProductDetails product={product} />;
}
export default ProductItemPage;
