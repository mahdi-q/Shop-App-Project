import PaymentsTable from "../_components/PaymentsTable";
import { getUserInfoApi } from "@/services/authServices";
import toStringCookies from "@/utils/toStringCookies";
import { cookies } from "next/headers";
import queryString from "query-string";

async function UserPaymentsPage({ searchParams }) {
  const cookieStore = await cookies();
  const strCookies = toStringCookies(cookieStore);
  const queries = queryString.stringify(searchParams);

  const data = await getUserInfoApi(queries, strCookies);
  const { payments } = data;

  return (
    <div>
      <h2 className="mb-6 font-bold text-black sm:text-lg lg:text-xl">
        لیست تمام تراکنش های کاربر
      </h2>

      {(!payments || payments.length <= 0) && (
        <div className="mt-4 flex items-center justify-center text-black">
          تراکنشی یافت نشد.
        </div>
      )}

      {payments && payments.length > 0 && <PaymentsTable payments={payments} />}
    </div>
  );
}
export default UserPaymentsPage;
