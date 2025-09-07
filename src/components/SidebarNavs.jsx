"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SidebarNavs({ onClose, sidebarNavs }) {
  const pathname = usePathname();

  return (
    <ul className="space-y-2">
      {sidebarNavs.map((nav) => (
        <li key={nav.id}>
          <Link
            href={nav.href}
            onClick={onClose}
            className={classNames(
              "flex w-full items-center gap-x-4 rounded-lg bg-primary-100/50 py-3 pr-3 text-secondary-800 transition-all duration-300 ease-in-out hover:bg-primary-100 hover:text-primary-700 [&>svg]:h-5 [&>svg]:w-5",
              {
                "!bg-primary-100 !font-bold !text-primary-900":
                  pathname === nav.href,
              },
            )}
          >
            {nav.icon}
            {nav.title}
          </Link>
        </li>
      ))}
    </ul>
  );
}
export default SidebarNavs;
