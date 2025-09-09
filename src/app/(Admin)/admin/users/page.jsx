"use client";

import Loader from "@/ui/Loader";
import UsersTable from "./_components/UsersTable";
import { useGetUsers } from "@/hooks/useGetUsers";
import { useSearchParams } from "next/navigation";
import Pagination from "@/ui/Pagination";

function UsersPage() {
  const searchParams = useSearchParams();
  const queries = searchParams.toString();
  const { isLoading, users, pagination } = useGetUsers(queries);

  return (
    <div>
      <h2 className="mb-6 font-bold text-black sm:text-lg lg:text-xl">
        لیست کاربران
      </h2>

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
