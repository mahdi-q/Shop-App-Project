import { useEffect, useState } from "react";
import ButtonIcon from "./ButtonIcon";
import { createPortal } from "react-dom";
import { HiOutlineXMark } from "react-icons/hi2";

function Modal({ title, description = "", open, onClose, children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    //  Now we are sure that the component is mounted
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    open &&
    createPortal(
      <>
        {/* Modal Backdrop */}
        <div
          className={`fixed inset-0 z-50 h-screen w-full bg-secondary-800 bg-opacity-30 backdrop-blur-sm ${open ? "block" : "pointer-events-none hidden"}`}
          onClick={onClose}
        ></div>

        {/* Modal Content */}
        <div
          className="fixed left-1/2 top-1/2 z-50 max-h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-md bg-background p-4 shadow-lg transition-all duration-500 ease-out md:max-w-lg"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {/* Modal Header */}
          <div className="mb-6 flex items-center justify-between border-b border-b-secondary-300 pb-2">
            <div>
              <h3 className="font-bold leading-6 text-secondary-800">
                {title}
              </h3>
              <p className="text-sm text-secondary-500">{description}</p>
            </div>

            <ButtonIcon onClick={onClose} varient="danger">
              <HiOutlineXMark />
            </ButtonIcon>
          </div>

          {/* Modal Body */}
          {children}
        </div>
      </>,
      document.body,
    )
  );
}
export default Modal;
