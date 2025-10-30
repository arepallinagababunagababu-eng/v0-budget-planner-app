import { connectDB } from "@/lib/mongodb"
import Investment from "@/models/Investment"
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

    const investment = await Investment.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(id), userId: decoded.userId },
      body,
      { new: true },
    )

    if (!investment) {
      return NextResponse.json({ error: "Investment not found" }, { status: 404 })
    }

    return NextResponse.json({ data: investment })
  } catch (error) {
    console.error("Error updating investment:", error)
    return NextResponse.json({ error: "Failed to update investment" }, { status: 500 })
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

    const investment = await Investment.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(id),
      userId: decoded.userId,
    })

    if (!investment) {
      return NextResponse.json({ error: "Investment not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Investment deleted" })
  } catch (error) {
    console.error("Error deleting investment:", error)
    return NextResponse.json({ error: "Failed to delete investment" }, { status: 500 })
  }
}
