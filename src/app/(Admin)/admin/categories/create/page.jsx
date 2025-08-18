import BackButton from "@/ui/BackButton";
import { FaChevronRight } from "react-icons/fa6";
import CategoryForm from "../_components/CategoryForm";

function CreateCategoryPage() {
  return (
    <div>
      <div className="mb-6 flex items-center gap-1 md:gap-2">
        <BackButton>
          <FaChevronRight />
        </BackButton>

        <h2 className="text-lg font-bold">ایجاد دسته‌بندی‌ جدید</h2>
      </div>

      <div>
        <CategoryForm />
      </div>
    </div>
  );
}
export default CreateCategoryPage;
