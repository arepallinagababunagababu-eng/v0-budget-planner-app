import { connectDB } from "@/lib/mongodb"
import Investment from "@/models/Investment"
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

    const investments = await Investment.find({ userId: decoded.userId }).sort({ purchaseDate: -1 })
    return Response.json({ data: investments })
  } catch (error) {
    console.error("Error fetching investments:", error)
    return Response.json({ error: "Failed to fetch investments" }, { status: 500 })
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

    const { name, type, amount, currentValue, purchaseDate, notes } = await req.json()

    if (!name || !type || !amount || !currentValue || !purchaseDate) {
      return Response.json({ error: "Missing required fields" }, { status: 400 })
    }

    const investment = new Investment({
      userId: decoded.userId,
      name,
      type,
      amount: Number.parseFloat(amount),
      currentValue: Number.parseFloat(currentValue),
      purchaseDate: new Date(purchaseDate),
      notes,
    })

    await investment.save()
    return Response.json({ data: investment }, { status: 201 })
  } catch (error) {
    console.error("Error creating investment:", error)
    return Response.json({ error: "Failed to create investment" }, { status: 500 })
  }
}
