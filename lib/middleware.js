import { verifyToken, getTokenFromRequest } from "./auth.js"

export function withAuth(handler) {
  return async (req, res) => {
    const token = getTokenFromRequest(req)

    if (!token) {
      return res.status(401).json({ error: "Unauthorized" })
    }

    const decoded = verifyToken(token)
    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" })
    }

    req.userId = decoded.userId
    return handler(req, res)
  }
}

export async function authMiddleware(req) {
  const token = getTokenFromRequest(req)

  if (!token) {
    return { error: "Unauthorized", status: 401 }
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return { error: "Invalid token", status: 401 }
  }

  return { userId: decoded.userId }
}
