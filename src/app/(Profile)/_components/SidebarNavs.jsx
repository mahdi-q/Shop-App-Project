"use client";

import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaUserGear } from "react-icons/fa6";
import { MdPayments } from "react-icons/md";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarNavs = [
  {
    id: 1,
    title: "داشبورد",
    icon: <TbLayoutDashboardFilled />,
    href: "/profile",
  },
  {
    id: 2,
    title: "اطلاعات کاربری",
    icon: <FaUserGear />,
    href: "/profile/me",
  },
  {
    id: 3,
    title: "سفارشات",
    icon: <MdPayments />,
    href: "/profile/payments",
  },
];

function SidebarNavs({ onClose }) {
  const pathname = usePathname();

  return (
    <ul className="space-y-2">
      {sidebarNavs.map((nav) => (
        <li key={nav.id}>
          <Link
            href={nav.href}
            onClick={onClose}
            className={classNames(
              "flex w-full items-center gap-x-4 rounded-lg bg-primary-100/70 py-3 pr-3 text-secondary-700 transition-all duration-300 ease-in-out hover:bg-primary-100 hover:text-secondary-800 [&>svg]:h-5 [&>svg]:w-5",
              {
                "!font-bold !text-primary-900": pathname === nav.href,
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
