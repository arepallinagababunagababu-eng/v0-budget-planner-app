import mongoose from "mongoose"

const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    targetAmount: {
      type: Number,
      required: true,
    },
    currentAmount: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      enum: ["Savings", "Investment", "Education", "Travel", "Home", "Other"],
      default: "Savings",
    },
    targetDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Completed", "Abandoned"],
      default: "Active",
    },
  },
  { timestamps: true },
)

export default mongoose.models.Goal || mongoose.model("Goal", goalSchema)
