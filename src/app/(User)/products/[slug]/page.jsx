import { getProductBySlugApi } from "@/services/productsServices";
import ProductDetails from "../_components/ProductDetails";
import { notFound } from "next/navigation";
import { FaChevronRight } from "react-icons/fa6";
import BackButton from "@/ui/BackButton";

export const metadata = {
  title: "جزئیات محصول",
  description: "صفحه جزئیات محصول اپلیکیشن فروشگاهی",
};

export const revalidate = 3600;

async function ProductItemPage({ params }) {
  const { product } = await getProductBySlugApi((await params).slug);

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
