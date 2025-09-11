"use client";

import useCreateQueryString from "@/hooks/useCreateQueryString";
import { CustomCheckbox } from "@/ui/CustomCheckbox";
import {
  notFound,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useState } from "react";

function ProductsFilter({ categories }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useCreateQueryString();

  const [selectedCategories, setSelectedCategories] = useState(
    searchParams.get("category")?.split(",") || [],
  );

  const checkboxHandler = (e) => {
    const categoryValue = e.target.value;

    if (selectedCategories.includes(categoryValue)) {
      const categories = selectedCategories.filter((c) => c !== categoryValue);
      setSelectedCategories(categories);
      router.push(`${pathname}?${createQueryString("category", categories)}`);
    } else {
      const categories = [...selectedCategories, categoryValue];
      setSelectedCategories(categories);
      router.push(`${pathname}?${createQueryString("category", categories)}`);
    }
  };

  if (!categories || categories.length <= 0)
    return <span>دسته بندی ای یافت نشد.</span>;

  return (
    <div className="flex flex-col gap-3">
      {categories.map((category) => (
        <CustomCheckbox
          key={category._id}
          id={category.englishTitle}
          name="categories"
          value={category.englishTitle}
          label={category.title}
          checked={selectedCategories.includes(category.englishTitle)}
          onChange={checkboxHandler}
        />
      ))}
    </div>
  );
}
export default ProductsFilter;
