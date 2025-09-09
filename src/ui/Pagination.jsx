"use client";

import { generatePagination } from "@/utils/generatePagination";
import classNames from "classnames";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";

export default function Pagination({ pagination }) {
  const { page, limit, totalPages, totalItems } = pagination;
  const currentPage = Number(page) || 1;
  const itemsPerPage = Number(limit) || 6;

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    params.set("limit", itemsPerPage.toString());
    return `${pathname}?${params.toString()}`;
  };

  const allPages = generatePagination(currentPage, totalPages);

  return (
    <div className="inline-flex">
      <PaginationArrow
        direction="right"
        href={createPageURL(currentPage - 1)}
        isDisabled={currentPage <= 1}
      />

      <div className="flex -space-x-px">
        {allPages.map((page, index) => {
          // let position: "first" | "last" | "single" | "middle" | undefined;
          let position;
          if (index === 0) position = "first";
          if (index === allPages.length - 1) position = "last";
          if (allPages.length === 1) position = "single";
          if (page === "...") position = "middle";

          return (
            <PaginationNumber
              key={`${page}-${index}`}
              href={createPageURL(page)}
              page={page}
              position={position}
              isActive={currentPage === page}
            />
          );
        })}
      </div>

      <PaginationArrow
        direction="left"
        href={createPageURL(currentPage + 1)}
        isDisabled={currentPage >= totalPages}
      />
    </div>
  );
}

// position?: "first" | "last" | "middle" | "single",

function PaginationNumber({ page, href, isActive, position }) {
  const className = classNames(
    "flex h-10 w-10 items-center justify-center text-sm border border-secondary-400 text-secondary-400",
    {
      "rounded-r-md": position === "first" || position === "single",
      "rounded-l-md": position === "last" || position === "single",
      "z-10 bg-primary-900 !border-primary-900 !text-white": isActive,
      "hover:bg-secondary-200": !isActive && position !== "middle",
      "text-secondary-300": position === "middle",
    },
  );

  return isActive || position === "middle" ? (
    <div className={className}>{page}</div>
  ) : (
    <Link href={href} className={className}>
      {page}
    </Link>
  );
}

function PaginationArrow({ href, direction, isDisabled }) {
  const className = classNames(
    "flex h-10 w-10 items-center justify-center rounded-md border border-secondary-400 text-secondary-400",
    {
      "pointer-events-none text-secondary-300 !border-secondary-300":
        isDisabled,
      "hover:bg-secondary-200": !isDisabled,
      "mr-2 md:mr-4": direction === "left",
      "ml-2 md:ml-4": direction === "right",
    },
  );

  const icon =
    direction === "left" ? (
      <HiOutlineArrowLeft className="w-4" />
    ) : (
      <HiOutlineArrowRight className="w-4" />
    );

  return isDisabled ? (
    <div className={className}>{icon}</div>
  ) : (
    <Link className={className} href={href}>
      {icon}
    </Link>
  );
}
