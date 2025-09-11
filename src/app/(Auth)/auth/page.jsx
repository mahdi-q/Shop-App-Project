"use client";

import { useState } from "react";
import SendOtpForm from "./_components/SendOtpForm";
import CheckOtpForm from "./_components/CheckOtpForm";
import useGetOtp from "./_hooks/useGetOtp";
import toast from "react-hot-toast";
import useCheckOtp from "./_hooks/useCheckOtp";
import { useRouter } from "next/navigation";

function AuthPage() {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");

  const { isGetting, otpResponse, getOtp } = useGetOtp();
  const { isChecking, checkOtp } = useCheckOtp();

  const router = useRouter();

  const onSendOtp = async ({ phoneNumber }) => {
    try {
      const { message } = await getOtp({ phoneNumber });
      toast.success(message);
      setPhoneNumber(phoneNumber);
      setStep(2);
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطا در ارسال کد تایید");
    }
  };

  const onCheckOtp = async (otp) => {
    try {
      const { message, user } = await checkOtp({ phoneNumber, otp });
      toast.success(message);
      
      if (!user.isActive) {
        return router.replace("/complete-profile");
      } else {
        return router.replace("/profile");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطا در تایید کد تایید");
    }
  };

  const onResendOtp = async () => {
    try {
      const { message } = await getOtp({ phoneNumber });
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message || "خطا در ارسال کد تایید");
    }
  };

  const renderPage = () => {
    switch (step) {
      case 1:
        return <SendOtpForm onSendOtp={onSendOtp} isSending={isGetting} />;

      case 2:
        return (
          <CheckOtpForm
            onCheckOtp={onCheckOtp}
            onResendOtp={onResendOtp}
            onBack={() => setStep((step) => step - 1)}
            isChecking={isChecking}
            otpResponse={otpResponse}
          />
        );

      default:
        return null;
    }
  };

  return <>{renderPage()}</>;
}
export default AuthPage;
