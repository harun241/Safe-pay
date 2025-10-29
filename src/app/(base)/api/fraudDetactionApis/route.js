import { NextResponse } from "next/server";
import { connectDb } from "@/lib/connectDb";
import fraudDetactionApi from "@/models/fraudDetactionApiModel";

export async function GET() {
  try {
    await connectDb();

    // 🔹 Fetch the only fraud API document
    const apiDoc = await fraudDetactionApi.findOne({}).lean();

    if (!apiDoc) {
      return NextResponse.json(
        { message: "No fraud API entry found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, api: apiDoc },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching fraud API:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}