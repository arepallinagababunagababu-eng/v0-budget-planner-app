import { connectDB } from "@/lib/mongodb"
import User from "@/models/User"
import { hashPassword, generateToken } from "@/lib/auth"

export async function POST(req) {
  try {
    await connectDB()

    const { name, email, password, confirmPassword } = await req.json()

    if (!name || !email || !password || !confirmPassword) {
      return Response.json({ error: "All fields are required" }, { status: 400 })
    }

    if (password !== confirmPassword) {
      return Response.json({ error: "Passwords do not match" }, { status: 400 })
    }

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return Response.json({ error: "Email already registered" }, { status: 400 })
    }

    const hashedPassword = await hashPassword(password)

    const user = new User({
      name,
      email,
      password: hashedPassword,
    })

    await user.save()

    const token = generateToken(user._id.toString())

    return Response.json(
      {
        message: "User registered successfully",
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return Response.json({ error: "Registration failed" }, { status: 500 })
  }
}
