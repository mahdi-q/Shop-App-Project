"use client";

import { useEffect, useState } from "react";
import SendOtpForm from "./_components/SendOtpForm";
import CheckOtpForm from "./_components/CheckOtpForm";
import useGetOtp from "./_hooks/useGetOtp";
import toast from "react-hot-toast";
import useCheckOtp from "./_hooks/useCheckOtp";
import { useRouter } from "next/navigation";
import useUser from "@/hooks/useUser";

function AuthPage() {
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");

  const { isGetting, otpResponse, getOtp } = useGetOtp();
  const { isChecking, checkOtp } = useCheckOtp();

  const router = useRouter();

  const { user } = useUser();

  useEffect(() => {
    if (user.isActive) return router.replace("/");
  }, [user]);

  const onSendOtp = async ({ phoneNumber }) => {
    try {
      const { message } = await getOtp({ phoneNumber });
      toast.success(message);
      setPhoneNumber(phoneNumber);
      setStep(2);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const onCheckOtp = async (otp) => {
    try {
      const { message, user } = await checkOtp({ phoneNumber, otp });
      toast.success(message);
      if (!user.isActive) return router.replace("/complete-profile");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  const onResendOtp = async () => {
    try {
      const { message } = await getOtp({ phoneNumber });
      toast.success(message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
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
            isChecking={isChecking}
            otpResponse={otpResponse}
            setStep={setStep}
          />
        );

      default:
        return null;
    }
  };

  return <>{renderPage()}</>;
}
export default AuthPage;
