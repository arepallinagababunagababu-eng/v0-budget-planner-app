import { connectDB } from "@/lib/mongodb"
import Expense from "@/models/Expense"
import { verifyToken, getTokenFromRequest } from "@/lib/auth"

export async function GET(req) {
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

    const expenses = await Expense.find({ userId: decoded.userId }).sort({ date: -1 })
    return Response.json({ data: expenses })
  } catch (error) {
    console.error("Error fetching expenses:", error)
    return Response.json({ error: "Failed to fetch expenses" }, { status: 500 })
  }
}

export async function POST(req) {
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

    const { description, amount, category, date, paymentMethod, notes } = await req.json()

    if (!description || !amount || !date) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const expense = new Expense({
      userId: decoded.userId,
      description,
      amount: Number.parseFloat(amount),
      category,
      date: new Date(date),
      paymentMethod,
      notes,
    })

    await expense.save()
    return Response.json({ data: expense }, { status: 201 })
  } catch (error) {
    console.error("Error creating expense:", error)
    return Response.json({ error: "Failed to create expense" }, { status: 500 })
  }
}
