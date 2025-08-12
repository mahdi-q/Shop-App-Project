"use client";

import useUser from "@/hooks/useUser";
import toLocalDate from "@/utils/toLocalDate";

function AdminPage() {
  const { isLoading, user } = useUser();

  return (
    <div className="mb-12 flex items-start justify-between">
      <div className="flex flex-col items-start gap-2">
        <h2 className="font-bold text-black sm:text-lg lg:text-xl">
          سلام؛ خوش آمدید به پنل مدیریت ادمین!
        </h2>

        <p className="text-sm text-secondary-800 lg:text-base">
          شما در این پنل میتوانید تمام اطلاعات سایت را مدیریت کنید.
        </p>
      </div>

      <div className="flex flex-col items-end gap-2">
        <span className="whitespace-nowrap text-sm font-bold text-black lg:text-base">
          تاریخ پیوستن
        </span>

        <span className="text-sm font-bold text-primary-900 lg:text-base">
          {!isLoading && toLocalDate(user.createdAt)}
        </span>
      </div>
    </div>
  );
}
export default AdminPage;
