import { connectDB } from "@/lib/mongodb"
import Expense from "@/models/Expense"
import { verifyToken, getTokenFromRequest } from "@/lib/auth"
import mongoose from "mongoose"

export async function PUT(req, { params }) {
  try {
    await connectDB()
    const token = getTokenFromRequest(req)
    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return Response.json({ error: "Invalid token" }, { status: 401 })
    }

    const { id } = params
    const body = await req.json()

    const expense = await Expense.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id), userId: decoded.userId },
      body,
      { new: true },
    )

    if (!expense) {
      return Response.json({ error: "Expense not found" }, { status: 404 })
    }

    return Response.json({ data: expense })
  } catch (error) {
    console.error("Error updating expense:", error)
    return Response.json({ error: "Failed to update expense" }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB()
    const token = getTokenFromRequest(req)
    if (!token) {
      return Response.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return Response.json({ error: "Invalid token" }, { status: 401 })
    }

    const { id } = params

    const expense = await Expense.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
      userId: decoded.userId,
    })

    if (!expense) {
      return Response.json({ error: "Expense not found" }, { status: 404 })
    }

    return Response.json({ message: "Expense deleted" })
  } catch (error) {
    console.error("Error deleting expense:", error)
    return Response.json({ error: "Failed to delete expense" }, { status: 500 })
  }
}
