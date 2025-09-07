import { getProductByIdApi, getProductsApi } from "@/services/productsServices";
import { useQuery } from "@tanstack/react-query";

export function useGetProducts() {
  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsApi,
  });

  const { products } = data || {};

  return { isLoading, products };
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
