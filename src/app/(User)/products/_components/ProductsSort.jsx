"use client";

import useCreateQueryString from "@/hooks/useCreateQueryString";
import { CustomRadio } from "@/ui/CustomRadio";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

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

function ProductsSort() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useCreateQueryString();

  const [selected, setSelected] = useState(
    searchParams.get("sort") || "newest",
  );

  const radioHandler = (e) => {
    const sortValue = e.target.value;
    setSelected(sortValue);
    router.push(`${pathname}?${createQueryString("sort", sortValue)}`);
  };

  return (
    <div className="flex flex-col gap-3">
      {filters.map((filter) => (
        <CustomRadio
          key={filter.id}
          id={filter.value}
          label={filter.title}
          name="sort"
          value={filter.value}
          checked={selected === filter.value}
          onChange={radioHandler}
        />
      ))}
    </div>
  );
}
export default ProductsSort;
