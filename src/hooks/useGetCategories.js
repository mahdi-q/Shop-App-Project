import { getCategoriesApi } from "@/services/categoriesServices";
import { useQuery } from "@tanstack/react-query";

export default function useGetCategories() {
  const { isLoading, data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesApi,
  });

  const { categories } = data || {};

  return { isLoading, categories };
}
