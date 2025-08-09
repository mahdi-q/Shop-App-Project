"use client";

import useAddToCart from "@/hooks/useAddToCart";
import useRemoveFromCart from "@/hooks/useRemoveFromCart";
import useUser from "@/hooks/useUser";
import Loader from "@/ui/Loader";
import TomanSvgIcon from "@/ui/TomanSvgIcon";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/changeNumbers";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { IoTrashOutline } from "react-icons/io5";
import useDeleteProductFromCart from "../_hooks/useDeleteProductFromCart";

function CartItems() {
  const { cart } = useUser();
  const { isAdding, addToCart } = useAddToCart();
  const { isRemoving, removeFromCart } = useRemoveFromCart();
  const { isDeleting, deleteProductFromCart } = useDeleteProductFromCart();

  const handleAddToCart = async (id) => {
    try {
      const { message } = await addToCart({ productId: id });
      toast.success(message);
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "خطا در افزودن به سبد خرید",
      );
    }
  };
  const handleRemoveFromCart = async (id) => {
    try {
      const { message } = await removeFromCart({ productId: id });
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطا در حذف از سبد خرید");
    }
  };
  const handleDeleteProduct = async (id) => {
    try {
      const { message } = await deleteProductFromCart({ productId: id });
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطا در حذف از سبد خرید");
    }
  };

  if (!cart) return <Loader />;

  return (
    <ul className="space-y-4">
      {cart.productDetail.map((product) => (
        <li
          key={product._id}
          className="flex justify-between rounded-lg border border-secondary-300 p-2.5"
        >
          <div className="flex h-full gap-4">
            <Image
              src={product.imageLink}
              alt="product-image"
              width={78}
              height={48}
              priority
              style={{
                objectFit: "cover",
                borderRadius: 4,
              }}
            />

            <div className="flex flex-col justify-between">
              <Link href={`/products/${product.slug}`}>
                <h4 className="text-lg font-bold hover:text-primary-900">
                  {product.title}
                </h4>
              </Link>

              <div className="mb-2 flex items-stretch gap-2 rounded-lg border border-secondary-300 p-2">
                <button
                  onClick={() => handleAddToCart(product._id)}
                  disabled={isAdding}
                  className="hover:text-success"
                >
                  <CiCirclePlus className="h-6 w-6" />
                </button>

                <span className="border-b border-b-secondary-900 px-2 font-bold">
                  {toPersianNumbers(product.quantity)}
                </span>

                <button
                  onClick={() => handleRemoveFromCart(product._id)}
                  disabled={isRemoving}
                  className="hover:text-error"
                >
                  <CiCircleMinus className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end justify-between">
            <button
              onClick={() => handleDeleteProduct(product._id)}
              disabled={isDeleting}
              className="rounded-md border border-error bg-error/10 p-1.5 text-error transition duration-200 hover:border-error hover:bg-error hover:text-white"
            >
              <IoTrashOutline className="h-6 w-6" />
            </button>

            <div>
              {product.discount > 0 && (
                <div className="mb-0.5 flex flex-row-reverse items-center justify-center">
                  <span className="mr-2 text-sm text-secondary-700 line-through">
                    {toPersianNumbersWithComma(product.price)}
                  </span>
                  <span className="badge badge--success px-2 py-1.5 text-xs leading-[10px]">
                    {toPersianNumbers(product.discount)}%
                  </span>
                </div>
              )}

              <div className="flex items-center gap-1 fill-primary-900 text-left text-lg font-black text-primary-900">
                <span>{toPersianNumbersWithComma(product.offPrice)}</span>
                <TomanSvgIcon color="rgb(--text-primary-900)" />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
export default CartItems;
