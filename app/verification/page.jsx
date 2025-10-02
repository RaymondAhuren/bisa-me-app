"use client";

import { resendOtp, verifyToken } from "@/utils/apiServices";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function VerifyAccount() {
  const router = useRouter();
  const [code, setCode] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);
    const [isAllowed, setIsAllowed] = useState(null);
    const[isResendClick, setIsResendClick] = useState(false)

  const inputRefs = useRef([]);

 useEffect(() => {
   const pending = localStorage.getItem("pendingVerification");
   const verified = localStorage.getItem("verified");

   if (!pending && !verified) {
     toast.warning("Access denied: please login first.");
     router.push("/");
     setIsAllowed(false);
   } else {
     setIsAllowed(true);
   }
 }, [router]);


  if (isAllowed === null) return null;
  if (isAllowed === false) return null;

  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = "";
      setCode(newCode);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otp = code.join("");
    if (otp.length !== 6) {
      toast.warning("Please enter the complete 6-digit code");
      return;
    }

    setLoading(true);

    try {
      const res = await verifyToken(otp);

      if (res?.code === 200) {
        toast.success("Account verified successfully!");

        //  Mark as verified
        localStorage.setItem("verified", "true");
        localStorage.removeItem("pendingVerification");

        // Save token for authenticated session
        localStorage.setItem("authToken", res.data.token);
        saveToken(res.data.token);
      } else {
        const errorMessage =
          res.message?.message || res.message || "Verification failed";
        toast.error(errorMessage);
      }
    } catch (err) {
      toast.error(err.message || "Failed to verify OTP");
    } finally {
      setLoading(false);
    }
  };
async function resendCode() {
  if (isResendClick) return; 

  setIsResendClick(true);
  toast.info("Sending OTP...");

  try {
    const result = await resendOtp();

    if (result && result.code === 200) {
      toast.success(result.message || "OTP resent successfully");
    } else {
      toast.error(result?.message || "Failed to resend OTP");
    }
  } catch (error) {
    toast.error(error.message || "Error resending OTP");
  } finally {
    setIsResendClick(false);
  }
}
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10 px-4">
      <div className="bg-white shadow-md rounded-xl w-full max-w-sm p-6 space-y-4 text-center">
        <h2 className="text-xl font-bold text-orange-500">
          Verify your Account
        </h2>
        {isResendClick ? (
          <>
            <p className="text-sm text-gray-600">
              We've sent a verification code to your phone
            </p>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-600">
              Enter the 6-digit code sent
            </p>
          </>
        )}

        <div className="flex justify-center gap-2">
          {code.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-10 h-10 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
          ))}
        </div>

        <p
          className="text-orange-500 py-2 rounded-lg font-semibold cursor-pointer"
          onClick={resendCode}
        >
          Resend code
        </p>

        <button
          onClick={handleVerify}
          disabled={loading || code.join("").length !== 6}
          className={`w-full bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition 
            ${
              loading || code.join("").length !== 6
                ? "opacity-50 cursor-default"
                : "cursor-pointer"
            }`}
        >
          {loading ? "Verifying..." : "VERIFY"}
        </button>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
