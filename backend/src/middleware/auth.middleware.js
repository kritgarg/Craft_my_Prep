import { verifyJwt } from "../utils/jwt.js";
import { prisma } from "../config/prisma.js";

export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Missing Authorization header" });

    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer")
      return res.status(401).json({ error: "Invalid Authorization header" });

    const token = parts[1];
    const payload = verifyJwt(token);
    if (!payload) return res.status(401).json({ error: "Invalid or expired token" });

    // Ensure ID is an integer as per schema
    const userId = parseInt(payload.id);
    if (isNaN(userId)) return res.status(401).json({ error: "Invalid user ID in token" });

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(401).json({ error: "User not found" });

    // attach user to request for controllers
    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    next(error);
  }
};