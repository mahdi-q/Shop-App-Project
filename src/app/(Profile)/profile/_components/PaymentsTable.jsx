import { userPaymentsTHeads } from "@/constants/tableHeads";
import PaymentRow from "./PaymentRow";

function PaymentsTable({ payments }) {
  return (
    <div className="overflow-auto rounded-md border border-secondary-200 p-3 shadow-sm">
      <table className="w-full min-w-[800px] table-auto border-collapse text-sm">
        <thead>
          <tr>
            {userPaymentsTHeads.map((item) => (
              <th key={item.id} className="table__th whitespace-nowrap">
                {item.label}
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
