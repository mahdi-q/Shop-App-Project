"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";

function SearchBox() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const formSubmit = (e) => {
    e.preventDefault();

    const searchValue = e.target.search.value;

    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set("page", 1);

    if (searchValue) {
      newParams.set("search", searchValue);
    } else {
      newParams.delete("search");
    }

    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  return (
    <form className="relative" onSubmit={formSubmit}>
      <input
        type="text"
        name="search"
        placeholder="جستجو ..."
        autoComplete="off"
        className="textField__input border-secondary-300 bg-transparent py-3 pl-10 text-sm leading-5 placeholder:text-secondary-600"
      />

      <button
        type="submit"
        className="absolute left-0 top-0 ml-3 flex h-full items-center justify-center"
      >
        <IoSearchOutline className="h-5 w-5 text-secondary-600 hover:text-primary-900" />
      </button>
    </form>
  );
}
export default SearchBox;
