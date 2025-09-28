import { connectDb } from "@/lib/connectDb";


export async function POST(request) {
  await connectDb();
  const body = await request.formData();
  const payload = Object.fromEntries(body);

  
  // 8. Redirect to frontend
  const redirectHtml = `
    <html>
      <head>
        <meta http-equiv="refresh" content="0; url=http://localhost:3000/" />
      </head>
      <body>
        <p>Payment processed. Redirecting...</p>
        <script>window.location.href = "http://localhost:3000/demo-payment/?payment=fail";</script>
      </body>
    </html>
  `;

  return new Response(redirectHtml, {
    status: 200,
    headers: { "Content-Type": "text/html" },
  });

 
}
