import useGetProduct from "@/hooks/useGetProduct";
import Link from "next/link";

const MultipleBadge = ({ productId }) => {
  const { isLoading, product } = useGetProduct(productId);

  if (isLoading) return null;

  return (
    product && (
      <Link href={`/products/${product.slug}`}>
        <span className="badge badge--primary text-base">
          {product?.title ?? "نامشخص"}
        </span>
      </Link>
    )
  );
};

export default MultipleBadge;
