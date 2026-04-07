import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { hashPassword, verifyPassword } from "./utils/password";
import { sendVerificationEmail } from "./utils/verification.email.service";
import { nextCookies } from "better-auth/next-js";
import { appConfig } from "@/lib/config";
import { USER_ROLE } from "./definitions";
import { routes } from "@/lib/routes";
import { prisma } from "../prisma/client";

export const auth = betterAuth({
  baseURL: appConfig.auth.baseURL,
  secret: appConfig.auth.secret,
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  trustedOrigins: appConfig.auth.trustedOrigins,
  socialProviders: {
    google: {
      clientId: appConfig.auth.socialProviders.google.id,
      clientSecret: appConfig.auth.socialProviders.google.secret,
      mapProfileToUser: (profile) => ({ name: profile.name }),
    },
    github: {
      clientId: appConfig.auth.socialProviders.github.id,
      clientSecret: appConfig.auth.socialProviders.github.secret,
      mapProfileToUser: (profile) => ({ name: profile.name }),
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    password: { hash: hashPassword, verify: verifyPassword },
    sendResetPassword: async ({ user, url }) => {
      if (user.emailVerified) {
        await sendVerificationEmail(user.email, url, "RESET_PASSWORD");
      }
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: false,
    sendVerificationEmail: async ({ user, url }) => {
      if (!user.emailVerified) {
        await sendVerificationEmail(user.email, url, "EMAIL_VERIFICATION");
      }
    },
  },
  user: {
    additionalFields: {
      role: {
        type: Object.values(USER_ROLE),
        required: true,
        defaultValue: USER_ROLE.USER,
        input: false, // don't allow user to set role
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
  },
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
    defaultCookieAttributes: {
      sameSite: "None",
      secure: true,
      httpOnly: true,
      partitioned: false,
    },
  },
  onAPIError: {
    errorURL: routes.auth.error,
  },
  plugins: [
    // next has to be last
    nextCookies(),
  ],
});
