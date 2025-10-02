"use client";

import { useState } from "react";
import { FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import SignUpForm from "./SignUpForm";
import { handleLogin } from "@/utils/apiServices";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

export default function SignInForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [authType, setAuthType] = useState("signin");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [countryShortName, setCountryShortName] = useState("GH");
  const [loading, setLoading] = useState(false);

 const onSubmit = async (e) => {
   e.preventDefault();

   if (!phone || !password || !countryShortName) {
     toast.error("All fields are required");
     return;
   }

   setLoading(true);

   try {
     const result = await handleLogin(phone, password, countryShortName);

     if (result && result.data?.token) {
       localStorage.setItem("authToken", result.data.token);
       localStorage.setItem("pendingVerification", "true");

       toast.success("Login successful! Redirecting...", { autoClose: 2000 });

       router.push("/verification");
     } else {
       toast.error(result?.message || "Login failed");
     }
   } catch (err) {
     toast.error(err.message || "Something went wrong");
   } finally {
     setLoading(false);
   }
 };


  return (
    <>
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white shadow-md rounded-xl w-full max-w-md p-6">
          <div className="flex justify-around border-b mb-6">
            <button
              onClick={() => setAuthType("signin")}
              className={`py-2 px-6 font-semibold transition ${
                authType === "signin"
                  ? "border-b-2 border-orange-500 text-orange-500"
                  : "text-gray-500 hover:text-orange-500"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthType("signup")}
              className={`py-2 px-6 font-semibold transition ${
                authType === "signup"
                  ? "border-b-2 border-orange-500 text-orange-500"
                  : "text-gray-500 hover:text-orange-500"
              }`}
            >
              Sign Up
            </button>
          </div>

          <div className="text-center mb-6">
            {authType === "signin" ? (
              <>
                <p className="text-2xl font-bold text-orange-500">
                  Welcome Back
                </p>
                <p className="text-sm text-gray-600">
                  Ready to continue on{" "}
                  <span className="text-blue-600 font-semibold">BisaMe</span>?
                </p>
              </>
            ) : (
              <>
                <p className="text-2xl font-bold text-orange-500">
                  Let's Get Started!
                </p>
                <p className="text-sm text-gray-600">
                  Join our users on{" "}
                  <span className="text-blue-600 font-semibold">BisaMe</span>
                </p>
              </>
            )}
          </div>

          {authType === "signin" ? (
            <form className="flex flex-col gap-4" onSubmit={onSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
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

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link
                    href="/forget-password"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-orange-400">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    className="w-full p-2 outline-none text-sm pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !phone || !password || !countryShortName}
                className="flex items-center justify-center cursor-pointer gap-2 bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50"
              >
                {loading ? (
                  <span className="loader border-t-2 border-white rounded-full w-5 h-5 animate-spin"></span>
                ) : (
                  <>
                    SIGN IN <FiArrowRight />
                  </>
                )}
              </button>
            </form>
          ) : (
            <SignUpForm
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          )}
        </div>
      </main>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </>
  );
}
