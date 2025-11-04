import * as service from "./auth.service.js";
import ENV from "../../config/env.js";

export async function register(req, res) {
  try {
    const result = await service.register(req.body);
    if (result.error) return res.status(400).json({ error: result.error });
    res.json({ message: "Registered", user: result.user ,token:result.token });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

export async function login(req, res) {
  try {
    const result = await service.login(req.body);
    if (result.error) return res.status(400).json({ error: result.error });
    res.json({ token: result.token, user: result.user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}

export async function getMe(req, res) {
  try {
    const result = await service.getMe(req.user.id);
    if (result.error) return res.status(404).json({ error: result.error });
    res.json({ user: result.user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}


// passport will attach { user, token } as req.user if done(null, {user, token})
export function githubCallback(req, res) {
  // depending on passport behavior, the object may be in req.user or req.authInfo
  const auth = req.user;
  if (!auth || !auth.token) {
    return res.status(400).send("Authentication failed");
  }

  // Redirect to frontend with token in query (or hash) — frontend should capture and store it
  const redirectTo = `${ENV.FRONTEND_URL}/oauth-callback?token=${auth.token}`;
  res.redirect(redirectTo);
}
