import { connectDB } from "@/lib/mongodb"
import Goal from "@/models/Goal"
import { verifyToken, getTokenFromRequest } from "@/lib/auth"
import { NextResponse } from "next/server"

export async function GET(req) {
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

    const goals = await Goal.find({ userId: decoded.userId }).sort({ targetDate: 1 })
    return NextResponse.json({ data: goals })
  } catch (error) {
    console.error("Error fetching goals:", error)
    return NextResponse.json({ error: "Failed to fetch goals" }, { status: 500 })
  }
}

export async function POST(req) {
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

    const { title, description, targetAmount, category, targetDate } = await req.json()

    if (!title || !targetAmount || !targetDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const goal = new Goal({
      userId: decoded.userId,
      title,
      description,
      targetAmount: Number.parseFloat(targetAmount),
      category,
      targetDate: new Date(targetDate),
    })

    await goal.save()
    return NextResponse.json({ data: goal }, { status: 201 })
  } catch (error) {
    console.error("Error creating goal:", error)
    return NextResponse.json({ error: "Failed to create goal" }, { status: 500 })
  }
}
