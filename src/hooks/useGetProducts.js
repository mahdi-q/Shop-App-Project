import { getProductsApi } from "@/services/productsServices";
import { useQuery } from "@tanstack/react-query";

export default function useGetProducts(){
  const { isLoading, data } = useQuery({
    queryKey: ["products"],
    queryFn: getProductsApi,
  });

  const { products } = data || {};

  return { isLoading, products };
}