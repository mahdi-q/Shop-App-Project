import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/changeNumbers";
import toLocalDate from "@/utils/toLocalDate";
import Link from "next/link";
import { CiEdit } from "react-icons/ci";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import { MdRemoveRedEye } from "react-icons/md";

function CouponRow({ coupon, index }) {
  return (
    <tr>
      <td className="table__td">{toPersianNumbers(index + 1)}</td>

      <td className="table__td whitespace-nowrap font-bold">
        <div className="flex items-center justify-center gap-1">
          <span className="font-bold leading-5">{coupon.code}</span>

          {coupon.isActive ? (
            <FaCircleCheck className="h-5 w-5 text-success" />
          ) : (
            <FaCircleXmark className="h-5 w-5 text-error" />
          )}
        </div>
      </td>

      <td className="table__td">
        <div className="flex items-center justify-center">
          <span className="badge badge--primary rounded-lg">{coupon.type}</span>
        </div>
      </td>

      <td className="table__td font-bold">
        {toPersianNumbersWithComma(coupon.amount)}
      </td>

      <td className="table__td max-w-[200px]">
        <div className="flex w-full flex-wrap items-center justify-center gap-2">
          {coupon.productIds.map((product) => (
            <span
              key={product._id}
              className="badge badge--secondary rounded-lg"
            >
              {product.title}
            </span>
          ))}
        </div>
      </td>

      <td className="table__td font-bold">
        {toPersianNumbers(coupon.usageCount)}
      </td>

      <td className="table__td font-bold">
        {toPersianNumbers(coupon.usageLimit)}
      </td>

      <td className="table__td">{toLocalDate(coupon.expireDate)}</td>

      <td className="table__td">
        <div className="flex items-center justify-center gap-2">
          <Link href={`/admin/coupons/${coupon._id}`}>
            <MdRemoveRedEye className="h-5 w-5 text-primary-900" />
          </Link>

          <Link href={`/admin/coupons/edit/${coupon._id}`}>
            <CiEdit className="h-5 w-5 text-success" />
          </Link>

          {/* <DeleteCouponModal id={coupon._id} title={coupon.title} /> */}
        </div>
      </td>
    </tr>
  );
}
export default CouponRow;
