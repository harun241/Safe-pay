import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  transaction_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  amount: { type: Number, required: true },
  payment_method: { type: String },
  card_type: { type: String },
  merchant_id: { type: String },

  // fraud detection support
  previous_txn_count_24h: { type: Number, default: 0 },
  avg_amount_30d: { type: Number, default: 0 },

  country: { type: String },
  city: { type: String },
  location: { type: String },
  is_fraud: { type: Boolean, default: false },

  status: {
    type: String,
    default: "pending",
    required: true,
  },
  timestamp: { type: Date, default: Date.now },
});

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);

export default Transaction;
