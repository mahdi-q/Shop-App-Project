import BackButton from "@/ui/BackButton";
import { FaChevronRight } from "react-icons/fa6";
import ProductForm from "../_components/ProductForm";

function CreateProductPage() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-1 md:gap-2">
        <BackButton>
          <FaChevronRight />
        </BackButton>

        <h2 className="text-lg font-bold">ایجاد محصول جدید</h2>
      </div>

      <div>
        <ProductForm/>
      </div>
    </div>
  );
}
export default CreateProductPage;
