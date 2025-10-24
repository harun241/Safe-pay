import { NextResponse } from "next/server";
import { connectDb } from "@/lib/connectDb";
import Subscription from "@/models/SubscriptionModel";

export async function GET(request) {
  try {
    await connectDb();

    // 🔹 Extract uid from query string
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get("user_id");

    if (!uid) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }

    // 🔹 Find subscriptions for this user, newest first
    const userSubscriptions = await Subscription.find({ user_id: uid })
      .sort({ timestamp: -1 }) // or createdAt if that's your field
      .lean();

    if (!userSubscriptions.length) {
      return NextResponse.json(
        { message: "No subscriptions found for this user." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, subscriptions: userSubscriptions },
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