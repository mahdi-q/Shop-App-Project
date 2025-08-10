"use client";

import useUser from "@/hooks/useUser";
import useLikeProduct from "../_hooks/useLikeProduct";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import ButtonIcon from "@/ui/ButtonIcon";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { toPersianNumbers } from "@/utils/changeNumbers";

function LikeProductButton({ isLiked, id, likesCount }) {
  const { isLiking, likeProduct } = useLikeProduct();
  const { user } = useUser();
  const router = useRouter();

  const [isLike, setIsLike] = useState(isLiked);

  const handleLikeClick = async () => {
    if (!user.isActive) return toast.error("لطفا وارد حساب کاربری خود شوید.");

    try {
      const { message } = await likeProduct(id);
      toast.success(message);
      setIsLike(!isLike);
      router.refresh();
    } catch (error) {
      toast.error(error?.respone?.data?.message || "خطا در لایک کردن محصول");
    }
  };

  return (
    <ButtonIcon onClick={handleLikeClick} varient="primary" disabled={isLiking}>
      {isLike ? <AiFillLike /> : <AiOutlineLike />}
      <span>{toPersianNumbers(likesCount)}</span>
    </ButtonIcon>
  );
}
export default LikeProductButton;
