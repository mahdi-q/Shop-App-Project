"use client";

import SvgLoaderComponent from "@/ui/SvgLoaderComponent";
import { useEffect, useState } from "react";
import OTPInput from "react-otp-input";

const RESEND_TIME = 90;

function CheckOtpForm({
  onCheckOtp,
  onResendOtp,
  isChecking,
  otpResponse,
  setStep,
}) {
  const [otp, setOtp] = useState();
  const [time, setTime] = useState(RESEND_TIME);

  const onSubmit = (e) => {
    e.preventDefault();
    onCheckOtp(otp);
  };

  const resendOtpHandler = () => {
    setTime(RESEND_TIME);
    onResendOtp();
  };

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <form onSubmit={(e) => onSubmit(e)} className="formLayout gap-4">
        <h1 className="text-lg font-bold text-black">تایید شماره موبایل</h1>

        {otpResponse ? (
          <p className="text-sm text-secondary-600">{otpResponse?.message}</p>
        ) : (
          <p className="text-sm text-secondary-600">
            کد تایید ارسال شده را وارد کنید
          </p>
        )}

        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span className="text-secondary-500">-</span>}
          renderInput={(props) => (
            <input
              {...props}
              style={{}}
              className="bg-secondary-0 w-8 rounded border border-secondary-400 py-2 text-center text-secondary-900 transition hover:border-primary-700 focus:border-2 focus:border-primary-700 focus:outline-none"
            />
          )}
          containerStyle={{
            width: "100%",
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "center",
            gap: "8px",
            paddingTop: "4px",
          }}
        />

        <div className="mt-6 flex w-full flex-col items-center justify-center gap-3">
          {isChecking ? (
            <SvgLoaderComponent />
          ) : (
            <button type="submit" className="btn btn--primary w-full">
              تایید
            </button>
          )}

          <div className="flex w-full items-center justify-between">
            {time > 0 ? (
              <p className="text-sm text-secondary-500">
                {<strong>{time}</strong>} ثانیه تا ارسال مجدد کد تایید
              </p>
            ) : (
              <button
                className="p-1 text-sm text-primary-800"
                onClick={resendOtpHandler}
              >
                ارسال مجدد کد تایید
              </button>
            )}

            <button
              className="p-1 text-sm text-primary-800"
              onClick={() => setStep((step) => step - 1)}
            >
              ویرایش شماره
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
export default CheckOtpForm;
