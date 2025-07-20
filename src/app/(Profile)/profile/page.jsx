"use client";

import useUser from "@/hooks/useUser";
import PaymentsTable from "./_components/PaymentsTable";
import { PulseLoader } from "react-spinners";
import toLocalDate from "@/utils/toLocalDate";
import Link from "next/link";

function ProfilePage() {
  const { isLoading, user, payments } = useUser();

  return (
    <div>
      <div className="mb-12 flex items-start justify-between">
        <div className="flex flex-col items-start gap-2">
          <h2 className="font-bold text-black sm:text-lg lg:text-xl">
            سلام؛ خوش آمدید به پنل خودتان!
          </h2>

          <p className="text-sm text-secondary-800 lg:text-base">
            شما در این پنل میتوانید اطلاعات و تراکنش های خود را مدیریت کنید.
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

      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-bold text-black sm:text-lg lg:text-xl">
            لیست آخرین تراکنش های شما
          </h2>

          {!isLoading && payments && payments.length > 0 && (
            <Link
              className="text-sm font-bold text-primary-900 lg:text-base"
              href="profile/payments"
            >
              <span className="hidden sm:inline-block">مشاهده </span>
              <span> همه تراکنش ها</span>
            </Link>
          )}
        </div>

        {isLoading && (
          <div className="flex items-center justify-center">
            <span className="ml-2 text-primary-900">در حال بارگذاری</span>
            <PulseLoader
              color="rgb(var(--color-primary-900))"
              size={12}
              margin={3}
            />
          </div>
        )}

        {!isLoading && (!payments || payments.length <= 0) && (
          <div className="mt-4 flex items-center justify-center">
            تراکنشی یافت نشد
          </div>
        )}

        {!isLoading && payments && payments.length > 0 && (
          <PaymentsTable
            payments={payments
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .slice(0, 5)}
          />
        )}
      </div>
    </div>
  );
}
export default ProfilePage;
