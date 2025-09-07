"use client";

import Header from "@/components/Header";
import BackButton from "@/ui/BackButton";
import { FaArrowRight } from "react-icons/fa6";

function NotFound() {
  return (
    <div className="h-screen">
      <Header />

      <div className="container xl:max-w-screen-xl">
        <div className="flex flex-col items-center justify-center gap-y-8 pt-10">
          <span className="text-9xl font-black text-primary-900">404</span>

          <h1 className="text-xl font-bold text-secondary-800">
            صفحه ای که دنبالش بودید، پیدا نشد.
          </h1>

          <BackButton className="btn--outline group flex items-center gap-x-2 px-6 py-2 text-secondary-800">
            <FaArrowRight className="h-5 w-5 text-primary-900 group-hover:text-secondary-50" />

            <span>برگشت</span>
          </BackButton>
        </div>
      </div>
    </div>
  );
}
export default NotFound;
