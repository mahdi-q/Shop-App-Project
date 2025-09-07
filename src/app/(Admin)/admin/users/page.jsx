"use client";

import Loader from "@/ui/Loader";
import UsersTable from "./_components/UsersTable";
import { useGetUsers } from "@/hooks/useGetUsers";

function UsersPage() {
  const { isLoading, users } = useGetUsers();

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

      {!isLoading && users && users.length > 0 && (
        <UsersTable
          users={users.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          )}
        />
      )}
    </div>
  );
}
export default UsersPage;
