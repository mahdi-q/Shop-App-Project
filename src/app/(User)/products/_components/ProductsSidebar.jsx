import { Suspense } from "react";
import Loader from "@/ui/Loader";
import ProductsFilter from "./ProductsFilter";
import ProductsSort from "./ProductsSort";

function ProductsSidebar({ categories }) {
  return (
    <div>
      <div className="mb-12">
        <h3 className="mb-4 text-lg font-bold text-black">دسته بندی ها</h3>

        <Suspense fallback={<Loader />}>
          <ProductsFilter categories={categories} />
        </Suspense>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-bold text-black">فیلتر ها</h3>

        <ProductsSort />
      </div>
    </div>
  );
}
export default ProductsSidebar;
