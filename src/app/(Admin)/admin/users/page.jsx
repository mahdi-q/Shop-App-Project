"use client";

import Loader from "@/ui/Loader";
import UsersTable from "./_components/UsersTable";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useSearchParams } from "next/navigation";
import Pagination from "@/ui/Pagination";
import SearchBox from "@/ui/SearchBox";
import SortButton from "@/ui/SortButton";

function UsersPage() {
  const searchParams = useSearchParams();
  const queries = searchParams.toString();
  const { isLoading, users, pagination } = useGetUsers(queries);

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between gap-3 md:flex-row md:items-center">
        <h2 className="font-bold text-black sm:text-lg lg:text-xl">
          لیست کاربران
        </h2>

        <div className="flex max-w-[500px] flex-1 items-center gap-x-2 md:gap-x-4">
          <div className="flex-1">
            <SearchBox />
          </div>

          <div>
            <SortButton />
          </div>
        </div>
      </div>

      {isLoading && <Loader />}

      {!isLoading && (!users || users.length <= 0) && (
        <div className="mt-4 flex items-center justify-center">
          کاربری یافت نشد.
        </div>
      )}

      {!isLoading && users && users.length > 0 && <UsersTable users={users} />}

      {!isLoading && users && users.length > 0 && (
        <div className="mt-6 flex items-center justify-center">
          <Pagination pagination={pagination} />
        </div>
      )}
    </div>
  );
}
export default UsersPage;
