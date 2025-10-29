import { NextResponse } from "next/server";
import { connectDb } from "@/lib/connectDb";
import Subscription from "@/models/SubscriptionModel";

export async function GET(request) {
  try {
    await connectDb();

    const { searchParams } = new URL(request.url);
    const uid = searchParams.get("user_id");

    if (!uid) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }

    const latestSubscription = await Subscription.findOne({ user_id: uid })
      .sort({ timestamp: -1 })
      .lean();

    if (!latestSubscription) {
      return NextResponse.json(
        { message: "No subscription found for this user." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, subscriptions: latestSubscription },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching subscription:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}