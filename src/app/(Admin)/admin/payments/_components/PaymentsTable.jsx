import { paymentsTHeads } from "@/constants/tableHeads";
import PaymentRow from "./PaymentRow";

function PaymentsTable({ payments }) {
  return (
    <div className="table__layout">
      <table>
        <thead>
          <tr>
            {paymentsTHeads.map((item) => (
              <th key={item.id} className="table__th whitespace-nowrap">
                <span>{item.label}</span>
                {item.unit && (
                  <span className="mr-1 text-xs font-bold">({item.unit})</span>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {payments.map((payment, index) => (
            <PaymentRow key={index} payment={payment} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default PaymentsTable;
