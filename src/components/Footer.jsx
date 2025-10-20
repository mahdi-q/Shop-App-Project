import Link from "next/link";
import { IoHome } from "react-icons/io5";
import { TbPackages } from "react-icons/tb";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { CiHeadphones, CiLaptop, CiMobile3 } from "react-icons/ci";
import { BsTabletLandscape } from "react-icons/bs";
import { LuUserRound } from "react-icons/lu";
import { RiAdminLine } from "react-icons/ri";

function Footer() {
  return (
    <div className="mt-10 min-h-[300px] w-full bg-primary-100/40">
      <div className="container flex flex-col gap-x-12 gap-y-10 px-6 py-12 text-black md:flex-row lg:gap-x-24 xl:max-w-screen-xl xl:gap-x-32">
        {/* Main Links */}
        <div>
          <Link
            href={"/"}
            className="mb-2 flex items-center gap-2 transition-all duration-200 hover:text-primary-900"
          >
            <IoHome />
            <h3 className="font-medium">صفحه اصلی تکنوشاپ</h3>
          </Link>
          <Link
            href={"/products"}
            className="flex items-center gap-2 transition-all duration-200 hover:text-primary-900"
          >
            <TbPackages />
            <h3 className="font-medium">صفحه محصولات تکنوشاپ</h3>
          </Link>
        </div>

        {/* Categories Link */}
        <div>
          <h3 className="mb-3 font-medium">دسته‌بندی ها</h3>

          <ul className="mr-2 flex flex-col gap-2">
            <li>
              <Link
                href={"/products?category=mobile"}
                className="flex items-center gap-1 transition-all duration-200 hover:text-primary-900"
              >
                <CiMobile3 />
                <span>موبایل</span>
              </Link>
            </li>

            <li>
              <Link
                href={"/products?category=laptop"}
                className="flex items-center gap-1 transition-all duration-200 hover:text-primary-900"
              >
                <CiLaptop />
                <span>لپ‌تاپ</span>
              </Link>
            </li>

            <li>
              <Link
                href={"/products?category=tablet"}
                className="flex items-center gap-1 transition-all duration-200 hover:text-primary-900"
              >
                <BsTabletLandscape />
                <span>تبلت</span>
              </Link>
            </li>

            <li>
              <Link
                href={"/products?category=headphone"}
                className="flex items-center gap-1 transition-all duration-200 hover:text-primary-900"
              >
                <CiHeadphones />
                <span>هدفون</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Panels Link */}
        <div>
          <h3 className="mb-3 font-medium">پنل های مدیریتی</h3>

          <ul className="mr-2 flex flex-col gap-2">
            <li>
              <Link
                href={"/profile"}
                className="flex items-center gap-1 transition-all duration-200 hover:text-primary-900"
              >
                <LuUserRound />
                <span>پنل مدیریت کاربر</span>
              </Link>
            </li>

            <li>
              <Link
                href={"/admin"}
                className="flex items-center gap-1 transition-all duration-200 hover:text-primary-900"
              >
                <RiAdminLine />
                <span>پنل مدیریت ادمین</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="mb-2 font-medium">شبکه های اجتماعی</h3>

          <ul className="mr-2 flex flex-col gap-2">
            <li>
              <Link
                target="_blank"
                href={"https://www.linkedin.com/in/q-mahdi84"}
                className="flex items-center gap-1 transition-all duration-200 hover:text-primary-900"
              >
                <FaLinkedin />
                <span>لینکدین</span>
              </Link>
            </li>

            <li>
              <Link
                target="_blank"
                href={"https://github.com/mahdi-q"}
                className="flex items-center gap-1 transition-all duration-200 hover:text-primary-900"
              >
                <FaGithub />
                <span>گیت‌هاب</span>
              </Link>
            </li>

            <li>
              <Link
                target="_blank"
                href={"https://instagram.com/q.mahdi84"}
                className="flex items-center gap-1 transition-all duration-200 hover:text-primary-900"
              >
                <FaInstagram />
                <span>اینستاگرام</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;
