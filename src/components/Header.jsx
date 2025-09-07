"use client";

import { useGetUserInfo } from "@/hooks/useGetUsers";
import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { TbLogin2, TbPackages } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { toPersianNumbers } from "@/utils/changeNumbers";
import { RiAdminLine } from "react-icons/ri";

function Header() {
  const { isLoading, user, cart } = useGetUserInfo();

  return (
    <header
      className={`sticky top-0 z-50 mb-10 bg-white shadow-md transition-all duration-200 ${isLoading ? "opacity-70 blur-sm" : "opacity-100 blur-0"}`}
    >
      <nav>
        <ul className="container flex items-center justify-between px-2 py-2 font-medium text-secondary-800 md:px-4 xl:max-w-screen-xl">
          <div className="flex items-center justify-center gap-x-2 md:gap-x-4">
            <li>
              <Link
                className="flex items-center gap-x-2 p-2 hover:text-primary-900"
                href="/"
              >
                <IoHome className="hidden h-5 w-5 md:block" />
                <span>خانه</span>
              </Link>
            </li>

            <li>
              <Link
                className="flex items-center gap-x-2 p-2 hover:text-primary-900"
                href="/products"
              >
                <TbPackages className="hidden h-5 w-5 md:block" />
                <span>محصولات</span>
              </Link>
            </li>
          </div>

          <div className="md:gap-x- flex flex-row-reverse items-center justify-center gap-x-2 md:gap-x-4">
            <li>
              {user.isActive ? (
                <Link
                  className="flex items-center gap-x-2 p-2 hover:text-primary-900"
                  href="/profile"
                >
                  <CgProfile className="h-5 w-5" />
                  <span className="hidden md:block">پروفایل</span>
                </Link>
              ) : (
                <Link
                  className="flex items-center gap-x-2 p-2 hover:text-primary-900"
                  href="/auth"
                >
                  <TbLogin2 className="h-5 w-5" />
                  <span className="hidden md:block">ورود</span>
                </Link>
              )}
            </li>

            <li>
              <Link
                className="relative flex items-center gap-x-2 p-2 hover:text-primary-900"
                href="/cart"
              >
                <HiOutlineShoppingCart className="h-5 w-5" />
                <span className="absolute right-0 top-0 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-primary-900/90 px-1 text-sm text-white">
                  {toPersianNumbers(
                    cart ? cart.payDetail.productIds.length : 0,
                  )}
                </span>
                <span className="hidden md:block">سبد خرید</span>
              </Link>
            </li>

            <li>
              <Link
                className="btn btn--primary ml-2 flex items-center gap-x-2 px-4 py-2 font-normal"
                href="/admin"
              >
                <RiAdminLine className="h-5 w-5" />
                <span className="hidden md:block">پنل ادمین</span>
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
