"use client";

import ButtonIcon from "@/ui/ButtonIcon";
import Link from "next/link";
import { HiOutlineXMark } from "react-icons/hi2";
import { TbLayoutDashboardFilled } from "react-icons/tb";
import { FaUsers } from "react-icons/fa6";
import { MdCategory, MdPayments } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import { RiCouponFill } from "react-icons/ri";
import { useState } from "react";
import Modal from "@/ui/Modal";
import useLogout from "@/hooks/useLogout";
import SvgLoaderComponent from "@/ui/SvgLoaderComponent";
import SidebarNavs from "@/components/SidebarNavs";
import { AiFillProduct } from "react-icons/ai";

const sidebarNavs = [
  {
    id: 1,
    title: "داشبورد",
    icon: <TbLayoutDashboardFilled />,
    href: "/admin",
  },
  {
    id: 2,
    title: "کاربران",
    icon: <FaUsers />,
    href: "/admin/users",
  },
  {
    id: 3,
    title: "محصولات",
    icon: <AiFillProduct />,
    href: "/admin/products",
  },
  {
    id: 4,
    title: "دسته‌بندی‌ها",
    icon: <MdCategory />,
    href: "/admin/categories",
  },
  {
    id: 5,
    title: "سفارشات",
    icon: <MdPayments />,
    href: "/admin/payments",
  },
  {
    id: 6,
    title: "کدهای‌ تخفیف",
    icon: <RiCouponFill />,
    href: "/admin/coupons",
  },
];

function AdminPanelSidebar({ onClose }) {
  const [open, setOpen] = useState(false);

  const { isPending, logout } = useLogout();

  const buttonHandler = () => {
    if (onClose) {
      onClose();
    }

    setOpen(true);
  };

  return (
    <div className="flex flex-col">
      {/* Sidebar Header */}
      <div className="my-4 flex w-full items-center justify-between border-b border-b-secondary-200 pb-2 transition-all duration-300 ease-in-out hover:border-b-primary-200 lg:mt-2 lg:justify-center">
        <Link
          href="/"
          className="font-bold text-secondary-700 hover:text-primary-900"
        >
          اپلیکیشن فروشگاهی
        </Link>

        <ButtonIcon
          className="block lg:hidden"
          varient="text"
          onClick={onClose}
        >
          <HiOutlineXMark className="!h-5 !w-5" />
        </ButtonIcon>
      </div>

      {/* Sidebar Content */}
      <div className="flex-auto">
        {/* Links */}
        <SidebarNavs onClose={onClose} sidebarNavs={sidebarNavs} />

        {/* Logout Button */}
        <div
          onClick={buttonHandler}
          className="mt-2 flex w-full cursor-pointer items-center gap-x-4 rounded-lg bg-primary-100/50 py-3 pr-3 text-error transition-all duration-300 ease-in-out hover:bg-primary-100 hover:text-error lg:text-secondary-800"
        >
          <TbLogout2 className="h-5 w-5" />
          <span>خروج</span>
        </div>

        {/* Logout Modal */}
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="خروج از حساب کاربری"
        >
          <div>
            <p className="mb-6 mt-4 text-center text-lg font-medium text-secondary-900">
              آیا از خارج شدن از حساب کاربری خود اطمینان دارید؟
            </p>

            <div className="flex w-full items-center justify-between gap-4">
              <div className="btn btn--danger flex w-full items-center justify-center">
                {isPending ? (
                  <SvgLoaderComponent />
                ) : (
                  <button onClick={logout} className="w-full">
                    خروج
                  </button>
                )}
              </div>

              <button
                onClick={() => setOpen(false)}
                className="btn btn--secondary w-full"
              >
                انصراف
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
export default AdminPanelSidebar;
