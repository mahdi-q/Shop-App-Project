import { getProductByIdApi, getProductsApi } from "@/services/productsServices";
import { useQuery } from "@tanstack/react-query";

export function useGetProducts(queries) {
  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProductsApi(queries),
  });

  const { products, pagination } = data || {};

  return { isLoading, products, pagination };
}

export function useGetProduct(id) {
  const { isLoading, data } = useQuery({
    queryKey: ["single-product", id],
    queryFn: () => getProductByIdApi(id),
    enabled: !!id,
  });

  const { product } = data || {};

  return { isLoading, product };
}
