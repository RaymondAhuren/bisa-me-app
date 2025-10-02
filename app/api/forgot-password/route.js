export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.countryShortName || !body.phoneNumber) {
      return new Response(
        JSON.stringify({ message: "countryShortName and phoneNumber are required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/authentication/forgot-password`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();
    console.log("Forgot Password API response:", data);

    return new Response(JSON.stringify(data), {
      status: res.ok ? 200 : res.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Forgot Password API error:", err);

    return new Response(
      JSON.stringify({ message: "Server or network error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
