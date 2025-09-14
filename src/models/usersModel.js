import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require:true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require:true
    },
  },
  { timestamps: true }
);

// Prevents recompiling model on hot reloads in Next.js
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;