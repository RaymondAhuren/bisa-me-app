"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createAccount } from "../utils/apiServices"; 

export default function SignUpForm({ showPassword, setShowPassword }) {
  const router = useRouter();

  // Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otherNames, setOtherNames] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupPhone, setSignupPhone] = useState("");
  const [termsChecked, setTermsChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!termsChecked) return toast.warning("Please agree to the terms");
    if (password !== confirmPassword)
      return toast.warning("Passwords do not match");
    if (!firstName || !lastName || !signupPhone || !password)
      return toast.warning("Fill all required fields");

    setLoading(true);

    const userData = {
      firstName,
      lastName,
      otherNames,
      phoneNumber: signupPhone,
      email: email || null,
      password,
      countryShortName: "GH",
      countryName: "Ghana",
      countryCode: "+233",
    };

    try {
      await createAccount(userData);

      // ✅ Set flag so verification page knows signup just happened
      localStorage.setItem("pendingVerification", "true");

      toast.success("Account created successfully!");
      router.push("/verification");
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Name Inputs */}
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="w-full p-2 border border-gray-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="w-full p-2 border border-gray-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-orange-400"
        />
        <input
          type="text"
          value={otherNames}
          onChange={(e) => setOtherNames(e.target.value)}
          placeholder="Other Names (Optional)"
          className="w-full p-2 border border-gray-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-orange-400"
        />

        {/* Phone */}
        <PhoneInput
          country={"gh"}
          value={signupPhone}
          onChange={setSignupPhone}
          inputClass="!w-full !py-2 !pl-12 !border !border-gray-300 !rounded-lg !text-sm"
          buttonClass="!border-gray-300"
        />

        {/* Email */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email (Optional)"
          className="w-full p-2 border border-gray-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-orange-400"
        />

        {/* Password */}
        <div className="relative flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-orange-400">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 pr-10 outline-none text-sm"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>

        {/* Confirm Password */}
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
          className="w-full p-2 border border-gray-300 rounded-lg outline-none text-sm focus:ring-2 focus:ring-orange-400"
        />

        {/* Terms */}
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={termsChecked}
            onChange={() => setTermsChecked(!termsChecked)}
            className="mt-1"
          />
          <p>
            I agree to the{" "}
            <span className="text-blue-600 underline">Terms of Use</span> and{" "}
            <span className="text-blue-600 underline">Privacy Policy</span>
          </p>
        </div>

        {/* Submit Button with Spinner */}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-orange-500 text-white py-2 rounded-lg font-semibold hover:bg-orange-600 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
          ) : (
            "SIGN UP"
          )}
          <FiArrowRight />
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
