import { NextResponse } from "next/server";
import { connectDb } from "@/lib/connectDb";
import Subscription from "@/models/SubscriptionModel";

export async function GET() {
  try {
    await connectDb();

    // ✅ Fetch all subscriptions, newest first
    const allSubscriptions = await Subscription.find({})
      .sort({ timestamp: -1 }) // sort by latest first
      .lean();

    if (!allSubscriptions.length) {
      return NextResponse.json(
        { message: "No subscriptions found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, subscriptions: allSubscriptions },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
