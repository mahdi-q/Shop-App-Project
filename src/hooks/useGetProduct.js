import { getProductByIdApi } from "@/services/productsServices";
import { useQuery } from "@tanstack/react-query";

export default function useGetProduct(id) {
  const { isLoading, data } = useQuery({
    queryKey: ["single-product", id],
    queryFn: () => getProductByIdApi(id),
    enabled: !!id,
  });

  const { product } = data || {};

  return { isLoading, product };
}
