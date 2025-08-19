import Modal from "@/ui/Modal";
import SvgLoaderComponent from "@/ui/SvgLoaderComponent";
import { useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import useDeleteCategory from "../_hooks/useDeleteCategory";

function DeleteCategoryModal({ id, title }) {
  const [isOpen, setIsOpen] = useState(false);
  const { isDeleting, deleteCategory } = useDeleteCategory();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleDelete = () => {
    deleteCategory(id);
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={handleOpen}>
        <IoTrashOutline className="h-5 w-5 text-error" />
      </button>

      <Modal title="حذف دسته‌بندی" open={isOpen} onClose={handleClose}>
        <div>
          <p className="mb-6 mt-4 text-center text-lg font-medium text-secondary-900">
            آیا از حذف دسته‌بندی "{title}" اطمینان دارید؟
          </p>

          <div className="flex w-full items-center justify-between gap-4">
            <div className="btn btn--danger flex w-full items-center justify-center">
              {isDeleting ? (
                <SvgLoaderComponent />
              ) : (
                <button onClick={handleDelete} className="w-full">
                  حذف
                </button>
              )}
            </div>

            <button onClick={handleClose} className="btn btn--secondary w-full">
              انصراف
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default DeleteCategoryModal;
