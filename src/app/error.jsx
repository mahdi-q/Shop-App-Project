"use client";

import Header from "@/components/Header";
import { HiArrowPath } from "react-icons/hi2";

function Error({ error, reset }) {
  return (
    <div className="h-screen">
      <Header />

      <div className="container xl:max-w-screen-xl">
        <div className="flex flex-col items-center justify-center gap-y-8 pt-10">
          <span className="text-xl font-bold text-primary-900">
            خطایی رخ داده است:
          </span>

          <h1 className="text-xl font-bold text-red-500">{error.message}</h1>

          <button
            onClick={reset}
            className="btn btn--outline group flex items-center gap-x-2 px-6 py-2 text-secondary-800"
          >
            <HiArrowPath className="h-5 w-5 text-primary-900 group-hover:text-secondary-50" />

            <span>تلاش دوباره</span>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Error;
