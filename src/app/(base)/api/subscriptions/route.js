import { NextResponse } from "next/server";
import { connectDb } from "@/lib/connectDb";
import Subscription from "@/models/SubscriptionModel";

export async function GET(request) {
    try {
        await connectDb();

        const { searchParams } = new URL(request.url);
        const email = searchParams.get("email");

        if (!email) {
            return NextResponse.json(
                { error: "User email is required." },
                { status: 400 }
            );
        }

        // Find the latest subscription (by createdAt)
        const latestSubscription = await Subscription.findOne({ userEmail: email })
            .sort({ createdAt: -1 })
            .lean();

        if (!latestSubscription) {
            return NextResponse.json(
                { message: "No subscriptions found for this user." },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, subscription: latestSubscription },
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
