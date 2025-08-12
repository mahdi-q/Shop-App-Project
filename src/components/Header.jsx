"use client";

import useUser from "@/hooks/useUser";
import Link from "next/link";

function Header() {
  const { isLoading, user, cart } = useUser();

  return (
    <header
      className={`sticky top-0 z-50 mb-10 bg-white shadow-md transition-all duration-200 ${isLoading ? "opacity-70 blur-sm" : "opacity-100 blur-0"}`}
    >
      <nav>
        <ul className="container flex items-center justify-between px-2 py-2 font-medium text-secondary-800 md:px-4 xl:max-w-screen-xl">
          <div className="flex items-center justify-center gap-x-2">
            <li>
              <Link className="block p-2 hover:text-primary-900" href="/">
                خانه
              </Link>
            </li>

            <li>
              <Link
                className="block p-2 hover:text-primary-900"
                href="/products"
              >
                محصولات
              </Link>
            </li>
          </div>

          <div className="flex flex-row-reverse items-center justify-center gap-x-2">
            <li>
              {user.isActive ? (
                <Link
                  className="block p-2 hover:text-primary-900"
                  href="/profile"
                >
                  پروفایل
                </Link>
              ) : (
                <Link className="block p-2 hover:text-primary-900" href="/auth">
                  ورود
                </Link>
              )}
            </li>

            <li>
              <Link className="block p-2 hover:text-primary-900" href="/cart">
                سبد خرید ({cart ? cart.payDetail.productIds.length : 0})
              </Link>
            </li>

            <li>
              <Link className="block p-2 hover:text-primary-900" href="/admin">
                پنل ادمین
              </Link>
            </li>
          </div>
        </ul>
      </nav>
    </header>
  );
}
export default Header;
