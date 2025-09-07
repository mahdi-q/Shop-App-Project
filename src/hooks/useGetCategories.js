import {
  getCategoriesApi,
  getCategoryApi,
} from "@/services/categoriesServices";
import { useQuery } from "@tanstack/react-query";

export function useGetCategories() {
  const { isLoading, data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesApi,
  });

  const { categories } = data || {};

  return { isLoading, categories };
}

export function useGetCategory(id) {
  const { isLoading, data } = useQuery({
    queryKey: ["single-category", id],
    queryFn: () => getCategoryApi(id),
    enabled: !!id,
  });

  const { category } = data || {};

  return { isLoading, category };
}
