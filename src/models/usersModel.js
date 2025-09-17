import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      require: true,
      unique: true,
    },
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    balance: { type: Number, default: 1000 },

    ip: {
      type: String,
    },
    country: { type: String },
    city: { type: String },
    location: { type: String },
    time: { type: Date, default: new Date().toISOString() },
  },
  { timestamps: true }
);

// Prevents recompiling model on hot reloads in Next.js
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
