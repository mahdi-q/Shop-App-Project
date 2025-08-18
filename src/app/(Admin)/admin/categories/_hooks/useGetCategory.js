import { getCategoryApi } from "@/services/categoriesServices";
import { useQuery } from "@tanstack/react-query";

export default function useGetCategory(id) {
  const { isLoading, data } = useQuery({
    queryKey: ["single-category", id],
    queryFn: () => getCategoryApi(id),
    enabled: !!id,
  });

  const { category } = data || {};

  return { isLoading, category };
}
