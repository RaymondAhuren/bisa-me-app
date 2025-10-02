// app/api/verify/route.js
export async function POST(request) {
  try {
    const { verificationCode, token } = await request.json();

    if (!verificationCode) {
      return new Response(
        JSON.stringify({ message: "Missing verificationCode" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (!token) {
      return new Response(JSON.stringify({ message: "Missing auth token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // use token properly
    };

    const body = { verificationCode };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/authentication/verify-otp`,
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();
  

    return new Response(JSON.stringify(data), {
      status: res.ok ? 200 : res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Server error:", err);
    return new Response(
      JSON.stringify({ message: "Server or network error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
