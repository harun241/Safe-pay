import { connectDb } from "@/lib/connectDb"; // your DB connection helper
import Transaction from "@/models/transactionModel";

export async function GET() {
  try {
    await connectDb();

    // Fetch all transactions sorted by newest first
    const transactions = await Transaction.findOne({}).sort({ timestamp: -1 });

    return new Response(JSON.stringify(transactions), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch transactions" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
