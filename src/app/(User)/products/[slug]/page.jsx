import { getProductBySlugApi } from "@/services/productsServices";
import ProductDetails from "../_components/ProductDetails";

async function ProductItemPage({ params }) {
  const { product } = await getProductBySlugApi(params.slug);

  return (
    <div className="relative mb-20 flex w-full flex-col items-start justify-between gap-8 px-4 md:flex-row-reverse md:px-8">
      <ProductDetails product={product} />
    </div>
  );
}
export default ProductItemPage;
