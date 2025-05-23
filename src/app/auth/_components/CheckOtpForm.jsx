"use client";

import { useState } from "react";
import OTPInput from "react-otp-input";

function CheckOtpForm({ onCheckOtp }) {
  const [otp, setOtp] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    onCheckOtp(otp);
  };

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <form onSubmit={(e) => onSubmit(e)} className="formLayout gap-4">
        <h1 className="text-lg font-bold text-black">تایید شماره موبایل</h1>

        <p className="text-sm text-secondary-600">
          کد تایید ارسال شده را وارد کنید.
        </p>

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

        <button type="submit" className="btn btn--primary mt-6 w-full">
          تایید
        </button>
      </form>
    </div>
  );
}
export default CheckOtpForm;
