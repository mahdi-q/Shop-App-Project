import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/changeNumbers";
import toLocalDate from "@/utils/toLocalDate";

function PaymentRow({ payment, index }) {
  return (
    <tr>
      <td className="table__td">{toPersianNumbers(index + 1)}</td>

      <td className="table__td max-w-[250px] truncate whitespace-nowrap">
        {toPersianNumbers(payment.invoiceNumber)}
      </td>

      <td className="table__td max-w-[250px] truncate whitespace-nowrap">
        {payment.description}
      </td>

      <td className="table__td w-[250px]">
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
        {payment.status === "COMPLETED" ? (
          <span className="badge badge--success rounded-lg">موفق</span>
        ) : (
          <span className="badge badge--error rounded-lg">ناموفق</span>
        )}
      </td>
    </tr>
  );
}
export default PaymentRow;
