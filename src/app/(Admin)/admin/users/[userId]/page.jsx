"use client";

import BackButton from "@/ui/BackButton";
import Loader from "@/ui/Loader";
import { FaChevronRight, FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import Avatar from "@/ui/Avatar";
import toLocalDate from "@/utils/toLocalDate";
import { toPersianNumbers } from "@/utils/changeNumbers";
import { BsShieldFillCheck, BsShieldFillX } from "react-icons/bs";
import MultipleBadge from "../_components/MultipleBadge";
import useGetUser from "@/hooks/useGetUser";
import { useParams } from "next/navigation";

function SingleUserPage() {
  const params = useParams();
  const { userId } = params;
  const { isLoading, user } = useGetUser(userId);

  return (
    <div>
      <div className="mb-6 flex items-center gap-1 md:gap-2">
        <BackButton>
          <FaChevronRight />
        </BackButton>

        <h2 className="text-lg font-bold">اطلاعات کاربر</h2>
      </div>

      {isLoading && <Loader />}

      {!isLoading && !user && (
        <div className="mt-4 flex items-center justify-center">
          کاربری یافت نشد.
        </div>
      )}

      {!isLoading && user && (
        <div className="flex w-full flex-col-reverse justify-between gap-6 rounded-md border border-secondary-300 p-4 lg:p-6 xl:flex-row xl:gap-2">
          <div className="mt-2 flex flex-col gap-4 px-2 lg:gap-6">
            <div className="flex items-center gap-3 text-base lg:text-lg">
              <span className="font-medium text-secondary-900">نام کاربر:</span>
              <span className="font-bold"> {user.name}</span>
            </div>

            <div className="flex items-center gap-3 text-base lg:text-lg">
              <span className="font-medium text-secondary-900">
                ایمیل کاربر:
              </span>
              <span className="font-bold"> {user.email}</span>
            </div>

            <div className="flex items-center gap-3 text-base lg:text-lg">
              <span className="font-medium text-secondary-900">
                شماره موبایل کاربر:
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold leading-5">
                  {toPersianNumbers(user.phoneNumber)}
                </span>
                {user.isVerifiedPhoneNumber ? (
                  <BsShieldFillCheck className="h-5 w-5 text-success" />
                ) : (
                  <BsShieldFillX className="h-5 w-5 text-error" />
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 text-base lg:text-lg">
              <span className="font-medium text-secondary-900">
                بیوگرافی کاربر:
              </span>
              <span className="font-bold"> {user.biography}</span>
            </div>

            <div className="flex items-center gap-3 text-base lg:text-lg">
              <span className="font-medium text-secondary-900">
                وضعیت کاربر:
              </span>
              <div className="flex items-center justify-center gap-2">
                <span className="font-bold leading-5">
                  {user.isActive ? "فعال" : "غیر‌فعال"}
                </span>
                {user.isActive ? (
                  <FaCircleCheck className="h-5 w-5 text-success" />
                ) : (
                  <FaCircleXmark className="h-5 w-5 text-error" />
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 text-base lg:text-lg">
              <span className="font-medium text-secondary-900">
                تاریخ پیوستن کاربر:
              </span>
              <span className="font-bold"> {toLocalDate(user.createdAt)}</span>
            </div>

            <div className="flex flex-col gap-3 text-base lg:text-lg">
              <span className="font-medium text-secondary-900">
                محصولات لایک شده توسط کاربر:
              </span>

              <div className="flex max-w-[100%] flex-wrap items-center gap-x-2 gap-y-4 xl:max-w-[70%]">
                {user.likedProducts && user.likedProducts.length > 0 ? (
                  user.likedProducts.map((item) => (
                    <MultipleBadge key={item} productId={item} />
                  ))
                ) : (
                  <span className="whitespace-nowrap text-base font-bold">
                    کاربر محصولی را لایک نکرده است.
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-3 text-base lg:text-lg">
              <span className="font-medium text-secondary-900">
                محصولات خریداری شده توسط کاربر:
              </span>

              <div className="flex max-w-[100%] flex-wrap items-center gap-x-2 gap-y-4 xl:max-w-[70%]">
                {user.Products && user.Products.length > 0 ? (
                  user.Products.map((item, index) => (
                    <MultipleBadge key={index} productId={item} />
                  ))
                ) : (
                  <span className="whitespace-nowrap text-base font-bold">
                    کاربر محصولی را خریداری نکرده است.
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-shrink-0 self-center xl:self-start">
            <Avatar src={user.avatarUrl} size={350} />
          </div>
        </div>
      )}
    </div>
  );
}
export default SingleUserPage;
