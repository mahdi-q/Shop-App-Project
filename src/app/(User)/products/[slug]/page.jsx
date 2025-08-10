import {
  getProductBySlugApi,
  getProductsApi,
} from "@/services/productsServices";
import ProductDetails from "../_components/ProductDetails";
import { notFound } from "next/navigation";
import { FaChevronRight } from "react-icons/fa6";
import BackButton from "@/ui/BackButton";

export const metadata = {
  title: "جزئیات محصول",
  description: "صفحه جزئیات محصول اپلیکیشن فروشگاهی",
};

export async function generateStaticParams() {
  const { products } = await getProductsApi();

  return products.map((product) => ({
    slug: product.slug,
  }));
}

async function ProductItemPage({ params }) {
  const { slug } = await params;
  const { product } = await getProductBySlugApi(slug);

  if (!product) return notFound();

  return (
    <div className="px-4 md:px-8">
      {/* Back Button */}
      <div className="mb-6 flex items-center gap-1 md:gap-2">
        <BackButton>
          <FaChevronRight />
        </BackButton>

        <span>جزئیات محصول</span>
      </div>

      {/* Product Details */}
      <ProductDetails product={product} />
    </div>
  );
}
export default ProductItemPage;
