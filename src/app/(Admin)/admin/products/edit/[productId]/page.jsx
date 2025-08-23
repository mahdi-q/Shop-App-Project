"use client";

import BackButton from "@/ui/BackButton";
import { FaChevronRight } from "react-icons/fa6";
import ProductForm from "../../_components/ProductForm";
import { useParams } from "next/navigation";
import useGetProduct from "@/hooks/useGetProduct";
import Loader from "@/ui/Loader";

function EditProductPage() {
  const params = useParams();
  const { productId } = params;
  const { isLoading, product } = useGetProduct(productId);

  return (
    <div>
      <div className="mb-6 flex items-center gap-1 md:gap-2">
        <BackButton>
          <FaChevronRight />
        </BackButton>

        <h2 className="text-lg font-bold">
          ادیت محصول "{product?.title ?? ""}"
        </h2>
      </div>

      {isLoading && <Loader />}

      {!isLoading && !product && (
        <div className="mt-4 flex items-center justify-center">
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
