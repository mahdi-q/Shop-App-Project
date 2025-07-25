"use client";

import { CustomRadio } from "@/ui/CustomRadio";
import { Suspense, useState } from "react";
import Loader from "@/ui/Loader";
import ProductsFilter from "./ProductsFilter";

const filters = [
  {
    id: 1,
    title: "جدید‌ترین",
    value: "newest",
  },
  {
    id: 2,
    title: "قدیمی‌ترین",
    value: "oldest",
  },
  {
    id: 3,
    title: "محبوب‌ترین",
    value: "popular",
  },
];

function ProductsSidebar({ categories }) {
  const [selected, setSelected] = useState("newest");

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

        <div className="flex flex-col gap-3">
          {filters.map((filter) => (
            <CustomRadio
              key={filter.id}
              id={filter.value}
              label={filter.title}
              name="sort"
              value={filter.value}
              checked={selected === filter.value}
              onChange={(e) => setSelected(e.target.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default ProductsSidebar;
