import { connectDB } from "@/lib/mongodb"
import Income from "@/models/Income"
import Expense from "@/models/Expense"
import Investment from "@/models/Investment"
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

    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)

    const [incomes, expenses, investments] = await Promise.all([
      Income.find({
        userId: decoded.userId,
        date: { $gte: startOfMonth, $lte: endOfMonth },
      }),
      Expense.find({
        userId: decoded.userId,
        date: { $gte: startOfMonth, $lte: endOfMonth },
      }),
      Investment.find({
        userId: decoded.userId,
        purchaseDate: { $gte: startOfMonth, $lte: endOfMonth },
      }),
    ])

    const totalIncome = incomes.reduce((sum, item) => sum + item.amount, 0)
    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0)
    const totalInvestments = investments.reduce((sum, item) => sum + item.amount, 0)
    const savings = totalIncome - totalExpenses - totalInvestments

    return NextResponse.json({
      data: {
        totalIncome,
        totalExpenses,
        totalInvestments,
        savings,
        month: startOfMonth.toLocaleString("default", { month: "long", year: "numeric" }),
      },
    })
  } catch (error) {
    console.error("Error fetching monthly summary:", error)
    return NextResponse.json({ error: "Failed to fetch summary" }, { status: 500 })
  }
}
