import { toPersianNumbers } from "@/utils/changeNumbers";
import toLocalDate from "@/utils/toLocalDate";
import Link from "next/link";
import { BsShieldFillCheck, BsShieldFillX } from "react-icons/bs";
import { MdRemoveRedEye } from "react-icons/md";

function UserRow({ user, index }) {
  return (
    <tr>
      <td className="table__td">{toPersianNumbers(index + 1)}</td>

      <td className="table__td whitespace-nowrap">{user.name}</td>

      <td className="table__td whitespace-nowrap">{user.email}</td>

      <td className="table__td">
        <div className="flex items-center justify-center gap-2">
          <span className="font-bold leading-5" dir="ltr">
            {user.phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3")}
          </span>

          {user.isVerifiedPhoneNumber ? (
            <BsShieldFillCheck className="h-5 w-5 text-success" />
          ) : (
            <BsShieldFillX className="h-5 w-5 text-error" />
          )}
        </div>
      </td>

      <td className="table__td max-w-[200px]">
        <div className="flex w-full flex-wrap items-center justify-center gap-2">
          {user.Products.slice(0, 4).map((product, secIndex) => {
            return (
              <span
                key={secIndex}
                className="badge badge--secondary rounded-lg"
              >
                {product.title}
              </span>
            );
          })}
        </div>
      </td>

      <td className="table__td">{toLocalDate(user.createdAt)}</td>

      <td className="table__td">
        <div className="flex items-center justify-center">
          <Link href={`/admin/users/${user._id}`}>
            <MdRemoveRedEye className="h-5 w-5 text-primary-900" />
          </Link>
        </div>
      </td>
    </tr>
  );
}
export default UserRow;
