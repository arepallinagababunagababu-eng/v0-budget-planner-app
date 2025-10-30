import { connectDB } from "@/lib/mongodb"
import Goal from "@/models/Goal"
import { verifyToken, getTokenFromRequest } from "@/lib/auth"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function PUT(req, { params }) {
  try {
    await connectDB()
    const token = getTokenFromRequest(req)
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { id } = params
    const body = await req.json()

    const goal = await Goal.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id), userId: decoded.userId }, body, {
      new: true,
    })

    if (!goal) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 })
    }

    return NextResponse.json({ data: goal })
  } catch (error) {
    console.error("Error updating goal:", error)
    return NextResponse.json({ error: "Failed to update goal" }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB()
    const token = getTokenFromRequest(req)
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    const { id } = params

    const goal = await Goal.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
      userId: decoded.userId,
    })

    if (!goal) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Goal deleted" })
  } catch (error) {
    console.error("Error deleting goal:", error)
    return NextResponse.json({ error: "Failed to delete goal" }, { status: 500 })
  }
}
