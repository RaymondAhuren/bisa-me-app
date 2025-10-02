// utils/apiServices.js
// utils/apiServices.js
export async function createAccount(userData) {
  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to create account");
    }

    //  Save token for verification
    if (data?.data?.token) {
      localStorage.setItem("authToken", data.data.token);
    }

    return data;
  } catch (error) {
    console.error("createAccount error:", error);
    throw error;
  }
}

// utils/apiServices.js
export async function verifyToken(otp, saveToken) {
  if (typeof otp !== "string") {
    throw new Error("OTP must be a string");
  }

  const token = localStorage.getItem("authToken");
  if (!token) {
    throw new Error("No token found. Please login or sign up again.");
  }

  const response = await fetch("/api/verify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ verificationCode: otp, token }),
  });

  const data = await response.json();
  console.log("verifyToken response:", data);

  if (!response.ok) {
    throw new Error(data.message || "Failed to verify OTP");
  }

  return data;
}


export async function handleLogin(phoneNumber, password, countryShortName) {
  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phoneNumber, password, countryShortName }),
    });

    const data = await res.json();

    console.log("Login API response:", data);

    // Check API "code" instead of res.ok
    if (data.code !== 200) {
      throw new Error(data.message || "Login failed");
    }

    if (!data.data?.token) {
      throw new Error("No token returned");
    }

    return data; // return API data
  } catch (error) {
    console.error("handleLogin error:", error);
    return null;
  }
}

export async function forgotPassword(countryShortName, phoneNumber) {
  try {
    const res = await fetch("/api/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ countryShortName, phoneNumber }),
    });

    const data = await res.json();

    console.log("forgotPassword API response:", data);

    if (!res.ok) {
      throw new Error(data.message || "Failed to send forgot password request");
    }

    return data;
  } catch (error) {
    console.error("forgotPassword error:", error);
    throw error;
  }
}

export async function resendOtp() {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) throw new Error("No auth token found");

    const res = await fetch("/api/resend-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();
    console.log("resendOtp response:", data);

    if (data.code !== 200) {
      throw new Error(data.message || "Failed to resend OTP");
    }

    return data;
  } catch (error) {
    console.error("resendOtp error:", error);
    return null;
  }
}

