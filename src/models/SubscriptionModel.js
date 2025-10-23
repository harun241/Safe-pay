import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema({
  transaction_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  amount: { type: Number, required: true },
  payment_method: { type: String },
  card_type: { type: String },
  merchant_id: { type: String },



  devices: {
    _id: false,
    deviceId: String,
    browser: String,

  },

  email: {type: String},



  country: { type: String },
  city: { type: String },
  location: { type: String },
  is_fraud: { type: Number, default: 0 },



  status: {
    type: String,
    default: "success",
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

const Subscription =
  mongoose.models.Subscription ||
  mongoose.model("Subscription", SubscriptionSchema);

export default Subscription;
