import { couponsTHeads } from "@/constants/tableHeads";
import CouponRow from "./CouponRow";

function CouponsTable({ coupons }) {
  return (
    <div className="table__layout">
      <table>
        <thead>
          <tr>
            {couponsTHeads.map((item) => (
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
          {coupons.map((coupon, index) => (
            <CouponRow key={index} coupon={coupon} index={index} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default CouponsTable;
