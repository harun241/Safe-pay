import { connectDb } from "@/lib/connectDb";


export async function POST(request) {
  await connectDb();
  const body = await request.formData();
  const payload = Object.fromEntries(body);


  // 8. Redirect to frontend
  const redirectHtml = `
    <html>
      <head>
        <meta http-equiv="refresh" content="0; url=${process.env.NEXT_PUBLIC_API_BASE_URL}" />
      </head>
      <body>
        <p>Payment processed. Redirecting...</p>
        <script>window.location.href = "${process.env.NEXT_PUBLIC_API_BASE_URL}/demo-payment/?payment=fail";</script>
      </body>
    </html>
  `;

  return new Response(redirectHtml, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });


}
