import { connectDb } from "@/lib/connectDb";
import Transaction from "@/models/transactionModel";
import User from "@/models/usersModel";
// GET user info by UID
export async function GET(request) {
  await connectDb();

  const { searchParams } = new URL(request.url);
  const uid = searchParams.get("uid");



  if (!uid) {
    return new Response(JSON.stringify({ error: "UID is required" }), {
      status: 400,
    });
  }

  try {
    
const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

const recentTransactions = await Transaction.aggregate([
  {
    $match: {
      user_id: uid,
      timestamp: { $gte: thirtyDaysAgo }
    }
  },
  { $sort: { timestamp: -1 } }, // descending order
  {
    $project: {
      transaction_id: 1,
      amount: 1,
      status: 1,
      is_fraud: 1,
      timestamp: 1,
      country: 1,
      city: 1,
      payment_method: 1
    }
  }
]);

const lastTransaction = recentTransactions[0];
const lastTransactionAmount = lastTransaction?.amount || 0;
const lastTransactionTime = lastTransaction?.timestamp || null;

const lastTransactionInfo ={
  lastTransactionAmount,
  lastTransactionTime
}


    return new Response(JSON.stringify({ exists: true, recentTransactions,lastTransactionInfo }), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}