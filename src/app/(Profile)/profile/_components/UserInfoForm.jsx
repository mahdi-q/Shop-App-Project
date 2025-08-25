"use client";

import RHFTextField from "@/ui/RHFTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import useUpdateProfile from "../_hooks/useUpdateProfile";
import toast from "react-hot-toast";
import SvgLoaderComponent from "@/ui/SvgLoaderComponent";

const schema = yup
  .object({
    phoneNumber: yup
      .string()
      .required("شماره موبایل الزامی است.")
      .matches(/^\d+$/, "شماره موبایل باید عدد باشد.")
      .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست."),
    email: yup
      .string()
      .required("ایمیل الزامی است.")
      .email("ایمیل معتبر نیست."),
    name: yup
      .string()
      .required("نام کاربری الزامی است.")
      .min(5, "نام کاربری باید حداقل ۵ کاراکتر باشد."),
  })
  .required();

function UserInfoForm({ user }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      phoneNumber: user.phoneNumber,
      email: user.email,
      name: user.name,
      biography: user.biography,
    },
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const { isUpdating, updateProfile } = useUpdateProfile();

  const onSubmit = (values) => {
    if (!isDirty) return toast.error("لطفا حداقل یک فیلد را تغییر دهید.");

    updateProfile(values);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="formLayout grid w-full grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2"
    >
      <RHFTextField
        label="شماره موبایل"
        register={register}
        errors={errors}
        name="phoneNumber"
        dir="ltr"
        isRequired
      />

      <RHFTextField
        label="ایمیل"
        register={register}
        errors={errors}
        name="email"
        dir="ltr"
        type="email"
        isRequired
      />

      <RHFTextField
        label="نام کاربری"
        register={register}
        errors={errors}
        name="name"
        isRequired
      />

      <RHFTextField
        label="بیوگرافی"
        register={register}
        errors={errors}
        name="biography"
      />

      <button
        type="submit"
        disabled={isUpdating}
        className={`btn ${isUpdating ? "btn--outline" : "btn--primary"} mt-2 self-center justify-self-start px-6 sm:px-8 lg:px-14`}
      >
        {isUpdating ? <SvgLoaderComponent /> : "تایید اطلاعات"}
      </button>
    </form>
  );
}
export default UserInfoForm;
