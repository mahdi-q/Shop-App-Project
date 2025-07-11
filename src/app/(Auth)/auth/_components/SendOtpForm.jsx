"use client";

import RHFTextField from "@/ui/RHFTextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SvgLoaderComponent from "@/ui/SvgLoaderComponent";

const schema = yup
  .object({
    phoneNumber: yup
      .string()
      .required("شماره موبایل الزامی است")
      .matches(/^09\d{9}$/, "شماره موبایل معتبر نیست"),
  })
  .required();

function SendOtpForm({ onSendOtp, isSending }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = (values) => {
    onSendOtp(values);

    reset();
  };

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <form onSubmit={handleSubmit(onSubmit)} className="formLayout">
        <h1 className="text-lg font-bold text-black">ورود به حساب کاربری</h1>

        <p className="text-sm text-secondary-600">
          لطفا شماره موبایل خود را وارد کنید.
        </p>

        <RHFTextField
          label="شماره موبایل"
          name="phoneNumber"
          register={register}
          errors={errors}
          dir="ltr"
          type="number"
          isRequired
          className="mt-6"
        />

        <div className="mt-6 flex w-full items-center justify-center">
          {isSending ? (
            <SvgLoaderComponent />
          ) : (
            <button type="submit" className="btn btn--primary w-full">
              ارسال کد تایید
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
export default SendOtpForm;
