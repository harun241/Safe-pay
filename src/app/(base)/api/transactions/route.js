import dbConnect from "@/lib/dbConnect";
import Transaction from "@/models/transactionModel";

export async function GET() {
  try {
    await dbConnect();
    const transactions = await Transaction.find({}).sort({ timestamp: -1 });
    return Response.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return Response.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}
