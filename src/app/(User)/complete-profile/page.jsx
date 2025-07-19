"use client";

import RHFTextField from "@/ui/RHFTextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import useCompleteProfile from "./_hooks/useCompleteProfile";
import SvgLoaderComponent from "@/ui/SvgLoaderComponent";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const schema = yup
  .object({
    userName: yup
      .string()
      .required("نام کاربری الزامی است")
      .min(5, "نام کاربری باید حداقل ۵ کاراکتر باشد"),
    email: yup.string().required("ایمیل الزامی است").email("ایمیل معتبر نیست"),
  })
  .required();

function CompleteProfilePage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const { isCompleting, completeProfile } = useCompleteProfile();

  const router = useRouter();

  const onSubmit = async (values) => {
    try {
      const { message } = await completeProfile({
        name: values.userName,
        email: values.email,
      });
      toast.success(message);
      router.replace("/profile");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="formLayout">
      <h1 className="text-lg font-bold text-black">تکمیل اطلاعات</h1>

      <p className="text-sm text-secondary-600">
        لطفا اطلاعات خود را تکمیل کنید.
      </p>

      <RHFTextField
        label="نام کاربری"
        name="userName"
        register={register}
        errors={errors}
        isRequired
        className="mt-6"
      />

      <RHFTextField
        label="ایمیل"
        name="email"
        register={register}
        errors={errors}
        dir="ltr"
        type="email"
        isRequired
        className="mt-6"
      />

      <div className="mt-6 flex w-full items-center justify-center">
        {isCompleting ? (
          <SvgLoaderComponent />
        ) : (
          <button type="submit" className="btn btn--primary w-full">
            تایید
          </button>
        )}
      </div>
    </form>
  );
}
export default CompleteProfilePage;
