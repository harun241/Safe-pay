import { connectDb } from "@/lib/connectDb";
import User from "@/models/usersModel";

// save user info in dataBase
export async function POST(request) {
  await connectDb();
  const { uid, name, email, password } = await request.json();

  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";

  const response = await fetch(`https://ipinfo.io/${ip}/json`);
  const data = await response.json();

  try {
    const user = await User.create({
      uid,
      name,
      email,
      password,
      balance: 1000,
      loginHistory: [
        {
          ip,
          country: data?.country_name || data?.country,
          city: data?.city,
          location: data?.loc,
          time: new Date(),
        },
      ],
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
  await connectDb();
  const { uid,email } = await request.json();

  // Get IP
  const forwarded = request.headers.get("x-forwarded-for");
  let ip = forwarded?.split(",")[0]?.trim() || "unknown";
  if (ip === "::1" || ip.startsWith("127.")) {
    ip = "8.8.8.8"; // fallback for local dev (Google DNS IP)
  }

  // Get location info
  const response = await fetch(`https://ipinfo.io/${ip}/json`);
  const data = await response.json();

  const loginEntry = {
    ip,
    country: data?.country_name || data?.country,
    city: data?.city,
    location: data?.loc,
    time: new Date(),
  };

  try {
    const user = await User.findOneAndUpdate(
      { uid },
      {
        $push: {
          loginHistory: {
            $each: [loginEntry],
            $slice: -10, // keep only last 10 logins
          },
        },
      },
      { new: true } // return updated doc
    ).exec();

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


