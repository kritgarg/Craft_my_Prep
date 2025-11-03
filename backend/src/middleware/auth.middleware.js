import { verifyJwt } from "../utils/jwt.js";
import { prisma } from "../config/prisma.js";

export async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Missing Authorization header" });

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer")
    return res.status(401).json({ error: "Invalid Authorization header" });

  const token = parts[1];
  const payload = verifyJwt(token);
  if (!payload) return res.status(401).json({ error: "Invalid or expired token" });

  const user = await prisma.user.findUnique({ where: { id: payload.id } });
  if (!user) return res.status(401).json({ error: "User not found" });

  // attach user to request for controllers
  req.user = user;
  next();
}
