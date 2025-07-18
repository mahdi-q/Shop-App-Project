"use client";

import useUser from "@/hooks/useUser";
import ButtonIcon from "@/ui/ButtonIcon";
import Drawer from "@/ui/Drawer";
import Link from "next/link";
import ProfileSidebar from "./ProfileSidebar";
import { useState } from "react";
import Avatar from "@/ui/Avatar";
import { HiMiniBars3, HiOutlineShoppingCart } from "react-icons/hi2";

function ProfileHeader() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const { isLoading, user } = useUser();

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

      <div className="flex flex-row-reverse items-center gap-4">
        <Link href="/profile">
          <Avatar src={user?.avatarUrl} size={28} />
        </Link>

        <Link href="/cart">
          <HiOutlineShoppingCart className="h-5 w-5" />
        </Link>
      </div>

      <Drawer open={isOpenDrawer} onClose={() => setIsOpenDrawer(false)}>
        <ProfileSidebar onClose={() => setIsOpenDrawer(false)} />
      </Drawer>
    </div>
  );
}
export default ProfileHeader;
