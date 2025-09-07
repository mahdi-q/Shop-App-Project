"use client";

import UserInfoForm from "../_components/UserInfoForm";
import Loader from "@/ui/Loader";
import { useGetUserInfo } from "@/hooks/useGetUsers";

function UserInfoPage() {
  const { isLoading, user } = useGetUserInfo();

  return (
    <div className="flex flex-col items-start gap-6">
      <div className="flex flex-col items-start gap-2">
        <h2 className="font-bold text-black sm:text-lg lg:text-xl">
          فرم اطلاعات کاربری
        </h2>

        <p className="text-sm text-secondary-800 lg:text-base">
          میتوانید اطلاعات کاربری خود را در فرم زیر تغییر دهید.
        </p>
      </div>

      {isLoading && <Loader />}

      {!isLoading && user && <UserInfoForm user={user} />}
    </div>
  );
}
export default UserInfoPage;
