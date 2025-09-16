import { connectDb } from "@/lib/connectDb";
import User from "@/models/usersModel";

// save user info in dataBase
export async function POST(request) {
  await connectDb(); // connect to MongoDB
  const { uid, name, email, password } = await request.json();
  // 1. Get user IP
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";

  // 2. Get location from IP
  const response = await fetch(`https://ipinfo.io/${ip}/json`);
  const data = await response.json();

  try {
    const user = await User.create({
      uid,
      name,
      email,
      password,
      ip: ip,
      country: data?.country_name || data?.country,
      city: data?.city,
      location: data?.loc,
      time: new Date().toISOString(),
    });

    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}

// updateAt when user every login and update location and ip
export async function PATCH(request) {
  await connectDb(); // connect to MongoDB
  const { uid, updatedAt } = await request.json();

  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";

  // 2. Get location from IP
  const response = await fetch(`https://ipinfo.io/${ip}/json`);
  const data = await response.json();

  const updateDog = {
    updatedAt,
    ip: ip,
    country: data?.country_name || data?.country,
    city: data?.city,
    location: data?.loc,
    time: new Date().toISOString(),
  };

  try {
    const user = await User.findOneAndUpdate(
      { uid }, // filter
      { $set: updateDog }, // update correctly
      { new: true } // return updated doc
    );

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
