import Joi from "joi";
import bcrypt from "bcrypt";
import { prisma } from "../../config/prisma.js";
import { signJwt } from "../../utils/jwt.js";

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().optional()
});

export async function register(body) {
  const { error, value } = registerSchema.validate(body);
  if (error) return { error: error.details[0].message };

  const existing = await prisma.user.findUnique({ where: { email: value.email } });
  if (existing) return { error: "Email already registered" };

  const hashed = await bcrypt.hash(value.password, 10);

  const user = await prisma.user.create({
    data: {
      email: value.email,
      password: hashed,
      name: value.name || null
    }
  });

  // optionally auto-login: create token
  const token = signJwt({ id: user.id });
  return { user: { id: user.id, email: user.email, name: user.name },token};
}

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

export async function login(body) {
  const { error, value } = loginSchema.validate(body);
  if (error) return { error: error.details[0].message };

  const user = await prisma.user.findUnique({ where: { email: value.email } });
  if (!user || !user.password) return { error: "Invalid credentials" };

  const ok = await bcrypt.compare(value.password, user.password);
  if (!ok) return { error: "Invalid credentials" };

  const token = signJwt({ id: user.id });
  return { token, user: { id: user.id, email: user.email, name: user.name, avatar: user.avatar } };
}

export async function getMe(userId) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return { error: "User not found" };
  return { user };
}

