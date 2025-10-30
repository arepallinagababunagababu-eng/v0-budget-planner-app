import mongoose from "mongoose"

const incomeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    source: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      enum: ["Salary", "Freelance", "Investment", "Gift", "Other"],
      default: "Other",
    },
    date: {
      type: Date,
      required: true,
    },
    notes: String,
  },
  { timestamps: true },
)

export default mongoose.models.Income || mongoose.model("Income", incomeSchema)
