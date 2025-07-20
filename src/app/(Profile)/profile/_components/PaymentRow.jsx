import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/changeNumbers";
import toLocalDate from "@/utils/toLocalDate";

function PaymentRow({ payment, index }) {
  return (
    <tr>
      <td className="table__td">{toPersianNumbers(index + 1)}</td>

      <td className="table__td truncate whitespace-nowrap">
        {toPersianNumbers(payment.invoiceNumber)}
      </td>

      <td className="table__td truncate whitespace-nowrap">
        {payment.description}
      </td>

      <td className="table__td">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {payment.cart.productDetail.map((product) => {
            return (
              <span key={product._id} className="badge badge--secondary">
                {product.title}
              </span>
            );
          })}
        </div>
      </td>

      <td className="table__td">{toPersianNumbersWithComma(payment.amount)}</td>

      <td className="table__td">{toLocalDate(payment.createdAt)}</td>

      <td className="table__td">
        {payment.status === "COMPLETED" ? (
          <span className="badge badge--success">موفق</span>
        ) : (
          <span className="badge badge--error">ناموفق</span>
        )}
      </td>
    </tr>
  );
}
export default PaymentRow;
