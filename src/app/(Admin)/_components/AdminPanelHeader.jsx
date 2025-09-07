"use client";

import ButtonIcon from "@/ui/ButtonIcon";
import Drawer from "@/ui/Drawer";
import Link from "next/link";
import { useState } from "react";
import Avatar from "@/ui/Avatar";
import { HiMiniBars3 } from "react-icons/hi2";
import AdminPanelSidebar from "./AdminPanelSidebar";
import { useGetUserInfo } from "@/hooks/useGetUsers";
import ToggleThemeButton from "@/components/ToggleThemeButton";

function AdminPanelHeader() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const { isLoading, user } = useGetUserInfo();

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

      <div className="flex flex-row-reverse items-center gap-3">
        <Link href="/admin">
          <Avatar src={user?.avatarUrl} size={28} />
        </Link>

        <ToggleThemeButton className="p-1.5 text-secondary-900" />
      </div>

      <Drawer open={isOpenDrawer} onClose={() => setIsOpenDrawer(false)}>
        <AdminPanelSidebar onClose={() => setIsOpenDrawer(false)} />
      </Drawer>
    </div>
  );
}
export default AdminPanelHeader;
