import Loader from "@/ui/Loader";
import SearchBox from "@/ui/SearchBox";
import SortButton from "@/ui/SortButton";
import { Suspense } from "react";
import UserPaymentsPageClient from "../_components/UserPaymentsPageClient";

function UserPaymentsPage() {
  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <h2 className="font-bold text-black sm:text-lg lg:text-xl">
          لیست تمام تراکنش های کاربر
        </h2>

        <div className="flex max-w-[500px] flex-1 items-center gap-x-2 md:gap-x-4">
          <div className="flex-1">
            <Suspense fallback={<Loader />}>
              <SearchBox />
            </Suspense>
          </div>

          <div>
            <Suspense fallback={<Loader />}>
              <SortButton />
            </Suspense>
          </div>
        </div>
      </div>

      <Suspense fallback={<Loader />}>
        <UserPaymentsPageClient />
      </Suspense>
    </div>
  );
}
export default UserPaymentsPage;
