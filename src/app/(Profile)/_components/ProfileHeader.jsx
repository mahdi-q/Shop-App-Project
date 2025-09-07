"use client";

import ButtonIcon from "@/ui/ButtonIcon";
import Drawer from "@/ui/Drawer";
import Link from "next/link";
import ProfileSidebar from "./ProfileSidebar";
import { useState } from "react";
import Avatar from "@/ui/Avatar";
import { HiMiniBars3, HiOutlineShoppingCart } from "react-icons/hi2";
import { useGetUserInfo } from "@/hooks/useGetUsers";
import { toPersianNumbers } from "@/utils/changeNumbers";
import ToggleThemeButton from "@/components/ToggleThemeButton";

function ProfileHeader() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const { isLoading, user, cart } = useGetUserInfo();

  return (
    <div
      className={`flex items-center justify-between ${isLoading ? "opacity-70 blur-sm" : "opacity-100 blur-none"}`}
    >
      <div className="flex items-center gap-3">
        <ButtonIcon
          className="block lg:hidden"
          varient="text"
          onClick={() => setIsOpenDrawer(true)}
        >
          <HiMiniBars3 className="!h-5 !w-5" />
        </ButtonIcon>

        <span className="text-sm font-bold text-secondary-800 lg:text-base">
          سلام؛ {user?.name}
        </span>
      </div>

      <div className="flex flex-row-reverse items-center gap-2">
        <Link href="/profile">
          <Avatar src={user?.avatarUrl} size={28} />
        </Link>

        <Link href="/cart" className="relative p-2">
          <HiOutlineShoppingCart className="h-5 w-5 text-secondary-900" />
          <span className="absolute right-0 top-0 flex min-h-4 min-w-4 items-center justify-center rounded-full bg-error/90 px-1 text-sm text-white">
            {toPersianNumbers(cart ? cart.payDetail.productIds.length : 0)}
          </span>
        </Link>

        <ToggleThemeButton className="p-2 text-secondary-900" />
      </div>

      <Drawer open={isOpenDrawer} onClose={() => setIsOpenDrawer(false)}>
        <ProfileSidebar onClose={() => setIsOpenDrawer(false)} />
      </Drawer>
    </div>
  );
}
export default ProfileHeader;
