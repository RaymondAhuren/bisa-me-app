export async function POST(request) {
  try {
    
    const body = await request.json();

    // Call real API
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/authentication/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: res.ok ? 200 : 400,
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
