"use client";

import { useState } from "react";
import SendOtpForm from "./_components/SendOtpForm";
import CheckOtpForm from "./_components/CheckOtpForm";

function AuthPage() {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");

  const onSendOtp = ({ phoneNumber }) => {
    console.log(phoneNumber);
    setPhoneNumber(phoneNumber);
    setStep(2);
  };

  const onCheckOtp = (otp) => {
    console.log(otp);
  };

  const renderPage = () => {
    switch (step) {
      case 1:
        return <SendOtpForm onSendOtp={onSendOtp} />;

      case 2:
        return <CheckOtpForm onCheckOtp={onCheckOtp} />;

      default:
        return null;
    }
  };

  return <>{renderPage()}</>;
}
export default AuthPage;
