"use client";

import { useGetUsers } from "@/hooks/useGetUsers";
import Loader from "@/ui/Loader";
import { useSearchParams } from "next/navigation";
import UsersTable from "./UsersTable";
import Pagination from "@/ui/Pagination";

function UsersPageClient() {
  const searchParams = useSearchParams();
  const queries = searchParams.toString();
  const { isLoading, users, pagination } = useGetUsers(queries);

  return (
    <div>
      {isLoading && <Loader />}

      {!isLoading && (!users || users.length <= 0) && (
        <div className="mt-4 flex items-center justify-center text-black">
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

export default UsersPageClient;
