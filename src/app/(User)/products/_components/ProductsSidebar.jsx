"use client";

import { CustomRadio } from "@/ui/CustomRadio";
import { Suspense, useState } from "react";
import Loader from "@/ui/Loader";
import { CustomCheckbox } from "@/ui/CustomCheckbox";

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

        {categories && categories.length > 0 && (
          <Suspense fallback={<Loader />}>
            <div className="flex flex-col gap-3">
              {categories.map((category) => (
                <CustomCheckbox
                  key={category._id}
                  id={category.englishTitle}
                  name={category.englishTitle}
                  value={category.englishTitle}
                  label={category.title}
                  onChange={() => {}}
                />
              ))}
            </div>
          </Suspense>
        )}
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
