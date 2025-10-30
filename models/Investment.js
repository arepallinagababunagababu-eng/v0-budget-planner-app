import mongoose from "mongoose"

const investmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Stock", "Mutual Fund", "Bond", "Crypto", "Real Estate", "Other"],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currentValue: {
      type: Number,
      required: true,
    },
    purchaseDate: {
      type: Date,
      required: true,
    },
    notes: String,
  },
  { timestamps: true },
)

export default mongoose.models.Investment || mongoose.model("Investment", investmentSchema)
