import BackButton from "@/ui/BackButton";
import { FaChevronRight } from "react-icons/fa6";
import CouponForm from "../_components/CouponForm";

function CreateCouponPage() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-1 text-black md:gap-2">
        <BackButton>
          <FaChevronRight />
        </BackButton>

        <h2 className="text-lg font-bold">ایجاد کد تخفیف جدید</h2>
      </div>

      <div>
        <CouponForm />
      </div>
    </div>
  );
}
export default CreateCouponPage;
