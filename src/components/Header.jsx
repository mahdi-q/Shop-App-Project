"use client";

import { useGetUserInfo } from "@/hooks/useGetUsers";
import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { TbLogin2, TbPackages } from "react-icons/tb";
import { LuUserRound } from "react-icons/lu";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { toPersianNumbers } from "@/utils/changeNumbers";
import { RiAdminLine } from "react-icons/ri";
import ToggleThemeButton from "./ToggleThemeButton";

function Header() {
  const { isLoading, user, cart } = useGetUserInfo();

  return (
    <header
      className={`bg-background sticky top-0 z-50 mb-10 shadow-md shadow-secondary-100 transition-all duration-200 ${isLoading ? "opacity-70 blur-sm" : "opacity-100 blur-0"}`}
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
                <Link className="btn btn--outline block p-1.5" href="/profile">
                  <LuUserRound className="h-5 w-5" />
                </Link>
              ) : (
                <Link className="btn btn--outline block p-1.5" href="/auth">
                  <TbLogin2 className="h-5 w-5" />
                </Link>
              )}
            </li>

            <li className="relative">
              <Link className="btn btn--outline block p-1.5" href="/cart">
                <HiOutlineShoppingCart className="h-5 w-5" />
              </Link>
              <span className="absolute -right-1.5 -top-1.5 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-error/90 px-1 text-sm text-white">
                {toPersianNumbers(cart ? cart.payDetail.productIds.length : 0)}
              </span>
            </li>

            <li>
              <ToggleThemeButton className="btn btn--outline p-1.5" />
            </li>

            <li>
              <Link
                className="btn btn--outline flex items-center gap-x-2 p-1.5 font-normal md:px-3"
                href="/admin"
              >
                <RiAdminLine className="h-5 w-5" />
                <span className="hidden leading-5 md:block">پنل ادمین</span>
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
