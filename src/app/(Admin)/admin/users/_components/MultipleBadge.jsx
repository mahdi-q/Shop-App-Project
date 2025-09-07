import { useGetProduct } from "@/hooks/useGetProducts";
import Link from "next/link";

const MultipleBadge = ({ productId }) => {
  const { isLoading, product } = useGetProduct(productId);

  if (isLoading) return null;

  return (
    product && (
      <Link href={`/admin/products/${product._id}`}>
        <span className="badge badge--primary text-base">
          {product?.title ?? "نامشخص"}
        </span>
      </Link>
    )
  );
};

export default MultipleBadge;
