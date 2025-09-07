"use client";

import BackButton from "@/ui/BackButton";
import { FaChevronRight } from "react-icons/fa6";
import ProductForm from "../../_components/ProductForm";
import { useParams } from "next/navigation";
import Loader from "@/ui/Loader";
import { useGetProduct } from "@/hooks/useGetProducts";

function EditProductPage() {
  const params = useParams();
  const { productId } = params;
  const { isLoading, product } = useGetProduct(productId);

  return (
    <div>
      <div className="mb-6 flex items-center gap-1 text-black md:gap-2">
        <BackButton>
          <FaChevronRight />
        </BackButton>

        <h2 className="text-lg font-bold">
          ویرایش محصول {!isLoading && `"${product?.title}"`}
        </h2>
      </div>

      {isLoading && <Loader />}

      {!isLoading && !product && (
        <div className="mt-4 flex items-center justify-center text-black">
          محصولی یافت نشد.
        </div>
      )}

      {!isLoading && product && (
        <div>
          <ProductForm initialData={product} isUpdating />
        </div>
      )}
    </div>
  );
}
export default EditProductPage;
