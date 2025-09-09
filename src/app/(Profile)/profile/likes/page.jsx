"use client";

import { useGetUserInfo } from "@/hooks/useGetUsers";
import Loader from "@/ui/Loader";
import UserLikedProduct from "../_components/UserLikedProduct";

function LikesProductsPage() {
  const { isLoading, user } = useGetUserInfo();
  const likedProducts = user?.likedProducts || [];

  return (
    <div>
      <h2 className="mb-6 font-bold text-black sm:text-lg lg:text-xl">
        لیست محصولات مورد علاقه کاربر
      </h2>

      {isLoading && <Loader />}

      {!isLoading && (!likedProducts || likedProducts.length <= 0) && (
        <div className="mt-4 flex items-center justify-center text-black">
          محصولی یافت نشد.
        </div>
      )}

      {!isLoading && likedProducts && likedProducts.length > 0 && (
        <div className="grid grid-cols-1 gap-x-4 gap-y-6 md:grid-cols-2 xl:grid-cols-3">
          {likedProducts.map((product) => (
            <UserLikedProduct key={product} productId={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default LikesProductsPage;
