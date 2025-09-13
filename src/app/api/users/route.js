import {  connectDb } from "@/lib/connectDb";
import User from "@/models/usersModel";



// save user info in dataBase 
export async function POST(request) {
  await connectDb(); // connect to MongoDB
  const { name, email,password } = await request.json();

  try {
      const user = await User.create({ name, email,password });
     
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}

// updateAt when user every login 
export async function PATCH(request) {
  await connectDb(); // connect to MongoDB
  const { email, updatedAt } = await request.json();

  try {
    const user = await User.findOneAndUpdate(
      { email }, // filter
      { $set: { updatedAt } }, // update correctly
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

