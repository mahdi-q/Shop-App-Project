"use client";

import useGetCategories from "@/hooks/useGetCategories";
import useGetCoupons from "@/hooks/useGetCoupons";
import useGetProducts from "@/hooks/useGetProducts";
import useUser from "@/hooks/useUser";
import Loader from "@/ui/Loader";
import toLocalDate from "@/utils/toLocalDate";
import ProductsTable from "./products/_components/ProductsTable";
import Link from "next/link";
import CategoriesTable from "./categories/_components/CategoriesTable";
import CouponsTable from "./coupons/_components/CouponsTable";

function AdminPage() {
  const { isLoading, user } = useUser();
  const { isLoading: gettingProducts, products } = useGetProducts();
  const { isLoading: gettingCategories, categories } = useGetCategories();
  const { isLoading: gettingCoupons, coupons } = useGetCoupons();

  return (
    <div>
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

      <div className="space-y-14">
        {/* Last Products */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-black sm:text-lg lg:text-xl">
              لیست آخرین محصولات
            </h2>

            {!gettingProducts && products && products.length > 0 && (
              <Link
                className="text-sm font-bold text-primary-900 lg:text-base"
                href="/admin/products"
              >
                <span className="hidden sm:inline-block">مشاهده </span>
                <span> همه محصولات</span>
              </Link>
            )}
          </div>

          {gettingProducts && <Loader />}

          {!gettingProducts && (!products || products.length <= 0) && (
            <div className="mt-4 flex items-center justify-center">
              محصولی یافت نشد
            </div>
          )}

          {!gettingProducts && products && products.length > 0 && (
            <ProductsTable
              products={products
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 3)}
            />
          )}
        </div>

        {/* Last Categories */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-black sm:text-lg lg:text-xl">
              لیست آخرین دسته‌بندی ها
            </h2>

            {!gettingCategories && categories && categories.length > 0 && (
              <Link
                className="text-sm font-bold text-primary-900 lg:text-base"
                href="/admin/categories"
              >
                <span className="hidden sm:inline-block">مشاهده </span>
                <span> همه دسته‌بندی ها</span>
              </Link>
            )}
          </div>

          {gettingCategories && <Loader />}

          {!gettingCategories && (!categories || categories.length <= 0) && (
            <div className="mt-4 flex items-center justify-center">
              دسته‌بندی ای یافت نشد
            </div>
          )}

          {!gettingCategories && categories && categories.length > 0 && (
            <CategoriesTable
              categories={categories
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 3)}
            />
          )}
        </div>

        {/* Last Coupons */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-black sm:text-lg lg:text-xl">
              لیست آخرین کد های تخفیف
            </h2>

            {!gettingCoupons && coupons && coupons.length > 0 && (
              <Link
                className="text-sm font-bold text-primary-900 lg:text-base"
                href="/admin/coupons"
              >
                <span className="hidden sm:inline-block">مشاهده </span>
                <span> همه کد تخفیف ها</span>
              </Link>
            )}
          </div>

          {gettingCoupons && <Loader />}

          {!gettingCoupons && (!coupons || coupons.length <= 0) && (
            <div className="mt-4 flex items-center justify-center">
              کد تخفیف ای یافت نشد
            </div>
          )}

          {!gettingCoupons && coupons && coupons.length > 0 && (
            <CouponsTable
              coupons={coupons
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .slice(0, 3)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default AdminPage;
