"use client";

import useUser from "@/hooks/useUser";
import { PulseLoader } from "react-spinners";
import UserInfoForm from "../_components/UserInfoForm";

function UserInfoPage() {
  const { isLoading, user } = useUser();

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

      {isLoading && (
        <div className="flex w-full items-center justify-center">
          <span className="ml-2 text-primary-900">در حال بارگذاری</span>
          <PulseLoader
            color="rgb(var(--color-primary-900))"
            size={12}
            margin={3}
          />
        </div>
      )}

      {!isLoading && user && <UserInfoForm user={user} />}
    </div>
  );
}
export default UserInfoPage;
