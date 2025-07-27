import { likeProductApi } from "@/services/productsServices";
import { useMutation } from "@tanstack/react-query";

export default function useLikeProduct() {
  const { isPending: isLiking, mutateAsync: likeProduct } = useMutation({
    mutationFn: likeProductApi,
  });

  return { isLiking, likeProduct };
}
