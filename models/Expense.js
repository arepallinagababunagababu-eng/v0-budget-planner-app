import mongoose from "mongoose"

const expenseSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["Food", "Transport", "Entertainment", "Utilities", "Healthcare", "Shopping", "Other"],
      default: "Other",
    },
    date: {
      type: Date,
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["Cash", "Credit Card", "Debit Card", "Bank Transfer", "Other"],
      default: "Cash",
    },
    notes: String,
  },
  { timestamps: true },
)

export default mongoose.models.Expense || mongoose.model("Expense", expenseSchema)
