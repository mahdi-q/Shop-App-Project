import ProductsFilter from "./ProductsFilter";
import ProductsSort from "./ProductsSort";
import { getCategoriesApi } from "@/services/categoriesServices";

async function ProductsSidebar() {
  const {categories} = await getCategoriesApi();

  return (
    <div>
      <div className="mb-12">
        <h3 className="mb-4 text-lg font-bold text-black">دسته بندی ها</h3>

        <ProductsFilter categories={categories} />
      </div>

      <div>
        <h3 className="mb-4 text-lg font-bold text-black">فیلتر ها</h3>

        <ProductsSort />
      </div>
    </div>
  );
}
export default ProductsSidebar;
