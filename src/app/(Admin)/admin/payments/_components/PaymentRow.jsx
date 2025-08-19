import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/changeNumbers";
import toLocalDate from "@/utils/toLocalDate";
import Link from "next/link";
import { MdRemoveRedEye } from "react-icons/md";

function PaymentRow({ payment, index }) {
  return (
    <tr>
      <td className="table__td">{toPersianNumbers(index + 1)}</td>

      <td className="table__td max-w-[250px] truncate whitespace-nowrap">
        {payment.invoiceNumber}
      </td>

      <td className="table__td max-w-[250px] truncate whitespace-nowrap">
        {payment.description}
      </td>

      <td className="table__td whitespace-nowrap">
        <div className="flex items-center justify-center">
          <span className="badge badge--primary rounded-lg">
            {payment.user.name}
          </span>
        </div>
      </td>

      <td className="table__td">
        <div className="flex w-[250px] flex-wrap items-center justify-center gap-2">
          {payment.cart.productDetail.slice(0, 4).map((product, secIndex) => {
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

      <td className="table__td font-bold">
        {toPersianNumbersWithComma(payment.amount)}
      </td>

      <td className="table__td">{toLocalDate(payment.createdAt)}</td>

      <td className="table__td">
        <div className="flex items-center justify-center">
          <Link href={`/admin/payments/${payment._id}`}>
            <MdRemoveRedEye className="h-5 w-5 text-primary-900" />
          </Link>
        </div>
      </td>
    </tr>
  );
}
export default PaymentRow;
