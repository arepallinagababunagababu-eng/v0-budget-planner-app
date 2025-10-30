import { connectDB } from "@/lib/mongodb"
import Income from "@/models/Income"
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

    const income = await Income.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id), userId: decoded.userId },
      body,
      { new: true }
    )

    if (!income) {
      return Response.json({ error: "Income not found" }, { status: 404 })
    }

    return Response.json({ data: income })
  } catch (error) {
    console.error("Error updating income:", error)
    return Response.json({ error: "Failed to update income" }, { status: 500 })
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

    const income = await Income.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
      userId: decoded.userId,
    })

    if (!income) {
      return Response.json({ error: "Income not found" }, { status: 404 })
    }

    return Response.json({ message: "Income deleted" })
  } catch (error) {
    console.error("Error deleting income:", error)
    return Response.json({ error: "Failed to delete income" }, { status: 500 })
  }
}
