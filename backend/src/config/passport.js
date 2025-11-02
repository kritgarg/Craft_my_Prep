import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { prisma } from "./prisma.js";

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/auth/github/callback`
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await prisma.user.findUnique({ where: { githubId: profile.id } });

      if (!user) {
        user = await prisma.user.create({
          data: {
            githubId: profile.id,
            name: profile.displayName,
            avatar: profile.photos[0].value
          }
        });
      }

      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await prisma.user.findUnique({ where: { id } });
  done(null, user);
});
