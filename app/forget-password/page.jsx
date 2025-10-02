"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { forgotPassword } from "@/utils/apiServices";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ForgetPasswordPage() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [countryShortName, setCountryShortName] = useState("GH");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    if (!phone) {
      toast.error("Please enter your phone number");
      return;
    }

    setLoading(true);

    try {
      const res = await forgotPassword(countryShortName, phone);

      if (res?.code === 200) {
        toast.success(res.message || "Verification code sent successfully");

        // Save token for verification flow
        if (res.data?.token) {
          localStorage.setItem("authToken", res.data.token);
          localStorage.setItem("pendingVerification", "true");
        }

        // Redirect to verification page
        setTimeout(() => router.push("/verification"), 1500);
      } else {
        toast.error(res.message || "Failed to send code");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-10">
        <div className="bg-white shadow-md rounded-xl w-full max-w-sm p-6 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-orange-500 text-center">
            Forget Password
          </h2>

          <p className="text-sm sm:text-base text-gray-600 text-center leading-snug">
            Enter the mobile phone number associated with your{" "}
            <span className="font-semibold text-blue-600">BisaMe</span> account.
          </p>

          {/* Phone Number Input */}
          <div className="space-y-1">
            <label className="block text-sm sm:text-base font-medium text-gray-700">
              Phone number
            </label>
            <PhoneInput
              country={"gh"}
              value={phone}
              onChange={(value, country) => {
                setPhone(value);
                setCountryShortName(country?.countryCode || "GH");
              }}
              inputClass="!w-full !py-2 !pl-12 !border !border-gray-300 !rounded-lg !text-sm"
              buttonClass="!border-gray-300"
            />
          </div>

          {/* Send Code Button */}
          <button
            onClick={handleSendCode}
            disabled={loading || !phone}
            className={`w-full flex items-center justify-center gap-2 bg-orange-500 text-white py-2 sm:py-3 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50`}
          >
            {loading ? "Sending..." : "SEND CODE"} <FiArrowRight />
          </button>

          {/* Links */}
          <div className="text-sm sm:text-base text-center text-gray-600 space-y-1">
            <p>
              Already have an account?{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                Sign In
              </Link>
            </p>
            <p>
              Don’t have an account?{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>

          {/* Help info */}
          <p className="text-xs sm:text-sm text-gray-500 text-center leading-snug">
            You may contact{" "}
            <span className="text-blue-600 font-medium cursor-pointer">
              Customer Service
            </span>{" "}
            for help restoring access to your account.
          </p>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
}
