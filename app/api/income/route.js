import { connectDB } from "@/lib/mongodb"
import Income from "@/models/Income"
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

    const income = await Income.find({ userId: decoded.userId }).sort({ date: -1 })
    return NextResponse.json({ data: income }, { status: 200 })
  } catch (error) {
    console.error("Error fetching income:", error)
    return NextResponse.json({ error: "Failed to fetch income" }, { status: 500 })
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

    const { source, amount, category, date, notes } = await req.json()

    if (!source || !amount || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const income = new Income({
      userId: decoded.userId,
      source,
      amount: Number.parseFloat(amount),
      category,
      date: new Date(date),
      notes,
    })

    await income.save()
    return NextResponse.json({ data: income }, { status: 201 })
  } catch (error) {
    console.error("Error creating income:", error)
    return NextResponse.json({ error: "Failed to create income" }, { status: 500 })
  }
}
