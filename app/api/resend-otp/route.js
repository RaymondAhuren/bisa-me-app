export async function POST(request) {
  try {
    const body = await request.json(); // Get body from client
    const token = body?.token;

    if (!token) {
      return new Response(
        JSON.stringify({ message: "No token found. Please login first." }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/authentication/resend-otp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    console.log("Resend OTP API response:", data);

    return new Response(JSON.stringify(data), {
      status: res.ok ? 200 : 400,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Resend OTP API error:", err);

    return new Response(
      JSON.stringify({ message: "Server or network error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
