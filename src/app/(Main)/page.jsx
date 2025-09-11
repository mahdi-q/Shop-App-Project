import { getProductsApi } from "@/services/productsServices";
import toStringCookies from "@/utils/toStringCookies";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { BsTabletLandscape } from "react-icons/bs";
import { CiHeadphones, CiLaptop, CiMobile3 } from "react-icons/ci";
import { LuMousePointerClick } from "react-icons/lu";
import CardMenu from "@/components/CardMenu";

export const metadata = {
  title: "خانه",
  description: "صفحه اصلی اپلیکیشن فروشگاهی",
};

export default async function Home() {
  const cookieStore = await cookies();
  const strCookies = toStringCookies(cookieStore);

  const { products: mobileProducts } = await getProductsApi(
    "category=mobile",
    strCookies,
  );
  const { products: laptopProducts } = await getProductsApi(
    "category=laptop",
    strCookies,
  );

  return (
    <div className="flex flex-col gap-12 px-4 md:px-6 lg:gap-6 lg:px-8">
      {/* Page Heading */}
      <div className="flex min-h-[300px] w-full flex-col-reverse items-center gap-4 lg:flex-row lg:justify-around">
        <div className="flex flex-col gap-2 text-black">
          <h1 className="mb-3 text-3xl font-semibold md:text-4xl">
            سایت فروشگاهی <strong className="text-primary-900">تکنوشاپ</strong>
          </h1>

          <span className="mb-1 text-lg font-medium">
            جدیدترین محصولات، بهترین قیمت ها!
          </span>

          <div className="mb-4 flex items-center gap-1">
            <span className="whitespace-nowrap text-lg font-medium md:text-xl">
              خریدی{" "}
              <strong className="text-xl text-success md:text-2xl">آسان</strong>{" "}
              و{" "}
              <strong className="text-xl text-success md:text-2xl">
                مطمئن
              </strong>{" "}
              فقط با یک کلیک
            </span>

            <LuMousePointerClick className="h-5 w-5" />
          </div>

          <Link className="self-center lg:self-start" href={"/products"}>
            <button className="btn btn--primary w-[200px]">محصولات</button>
          </Link>
        </div>

        <div className="relative h-[360px] w-[360px]">
          <Image src={"/images/heading.png"} fill alt="heading-image" />
        </div>
      </div>

      {/* Categories */}
      <div className="min-h-[250px] w-full">
        <h2 className="mb-6 text-center text-xl font-semibold text-black">
          لیست دسته‌بندی ها
        </h2>

        <div className="mx-16 grid grid-cols-2 items-center justify-center gap-8 md:grid-cols-4">
          <Link href={"/products?category=mobile"}>
            <div className="flex flex-col items-center justify-center gap-4 rounded-md border border-secondary-200 px-8 py-4 text-black transition-all duration-200 hover:border-primary-900 hover:shadow-md">
              <span>
                <CiMobile3 className="h-16 w-16 text-primary-900" />
              </span>
              <span className="text-xl font-medium">موبایل</span>
            </div>
          </Link>

          <Link href={"/products?category=laptop"}>
            <div className="flex flex-col items-center justify-center gap-4 rounded-md border border-secondary-200 px-8 py-4 text-black transition-all duration-200 hover:border-primary-900 hover:shadow-md">
              <span>
                <CiLaptop className="h-16 w-16 text-primary-900" />
              </span>
              <span className="text-xl font-medium">لپ‌تاپ</span>
            </div>
          </Link>

          <Link href={"/products?category=tablet"}>
            <div className="flex flex-col items-center justify-center gap-4 rounded-md border border-secondary-200 px-8 py-4 text-black transition-all duration-200 hover:border-primary-900 hover:shadow-md">
              <span>
                <BsTabletLandscape className="h-16 w-16 text-primary-900" />
              </span>
              <span className="text-xl font-medium">تبلت</span>
            </div>
          </Link>

          <Link href={"/products?category=headphone"}>
            <div className="flex flex-col items-center justify-center gap-4 rounded-md border border-secondary-200 px-8 py-4 text-black transition-all duration-200 hover:border-primary-900 hover:shadow-md">
              <span>
                <CiHeadphones className="h-16 w-16 text-primary-900" />
              </span>
              <span className="text-xl font-medium">هدفون</span>
            </div>
          </Link>
        </div>
      </div>

      {/* Last Products */}
      <CardMenu
        products={mobileProducts}
        query={"category=mobile"}
        title={"آخرین محصولات دسته‌بندی موبایل"}
      />

      {/* Seperator Line */}
      <div className="px-8">
        <span className="block w-full border border-dashed border-secondary-600"></span>
      </div>

      {/* Last Products */}
      <CardMenu
        products={laptopProducts}
        query={"category=laptop"}
        title={"آخرین محصولات دسته‌بندی لپ‌تاپ"}
      />
    </div>
  );
}
