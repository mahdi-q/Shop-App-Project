import {
  getCategoriesApi,
  getCategoryApi,
} from "@/services/categoriesServices";
import { useQuery } from "@tanstack/react-query";

export function useGetCategories(queries) {
  const { isLoading, data } = useQuery({
    queryKey: ["categories", queries],
    queryFn: () => getCategoriesApi(queries),
  });

  const { categories, pagination } = data || {};

  return { isLoading, categories, pagination };
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
