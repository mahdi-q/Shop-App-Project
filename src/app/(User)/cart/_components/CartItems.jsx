"use client";

import Loader from "@/ui/Loader";
import TomanSvgIcon from "@/ui/TomanSvgIcon";
import {
  toPersianNumbers,
  toPersianNumbersWithComma,
} from "@/utils/changeNumbers";
import Link from "next/link";
import toast from "react-hot-toast";
import { IoTrashOutline } from "react-icons/io5";
import useDeleteProductFromCart from "../_hooks/useDeleteProductFromCart";
import CartActions from "./CartActions";
import { useGetUserInfo } from "@/hooks/useGetUsers";
import ImageCover from "@/components/ImageCover";

function CartItems() {
  const { isLoading, user, cart } = useGetUserInfo();
  const { isDeleting, deleteProductFromCart } = useDeleteProductFromCart();

  const handleDeleteProduct = async (id) => {
    try {
      const { message } = await deleteProductFromCart({ productId: id });
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطا در حذف از سبد خرید");
    }
  };

  if (isLoading) return <Loader />;

  if (!user.isActive)
    return (
      <div className="mt-8 text-lg font-medium text-secondary-900">
        برای مشاهده سبد خرید لطفا وارد{" "}
        <Link href="/auth" className="font-bold !text-primary-900">
          حساب کاربری
        </Link>{" "}
        خود شوید.
      </div>
    );

  if (!cart.productDetail || cart.productDetail.length <= 0)
    return (
      <div>
        <div className="mb-1 text-lg font-medium text-secondary-900">
          سبد خرید شما خالی است.
        </div>
        <Link href="/products" className="font-bold text-primary-900">
          مشاهده صفحه محصولات
        </Link>
      </div>
    );

  return (
    <ul className="space-y-4 text-black">
      {cart.productDetail.map((product) => (
        <li
          key={product._id}
          className="flex justify-between rounded-lg border border-secondary-300 p-2.5"
        >
          <div className="flex h-full gap-4">
            <div className="relative h-[98px] w-[78px] overflow-hidden rounded">
              <ImageCover src={product.imageLinkUrl} fill priority />
            </div>

            <div className="flex flex-col justify-between">
              <Link href={`/products/${product.slug}`}>
                <h4 className="text-lg font-bold hover:text-primary-900">
                  {product.title}
                </h4>
              </Link>

              <div className="mb-2">
                <CartActions id={product._id} quantity={product.quantity} />
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
                <TomanSvgIcon className="!fill-primary-900" />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
export default CartItems;
