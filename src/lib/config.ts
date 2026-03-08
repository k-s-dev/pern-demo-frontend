/**
 * load environment
 * requires NODE_ENV to be set
 */

import { APP_REQUIRED_ENV_VARIABLES } from "./constants";
import { EnvError } from "./definitions/errors";

APP_REQUIRED_ENV_VARIABLES.forEach((variable) => {
  const value = process.env[variable];
  if (!value || value === "") {
    console.log(`Environment variable missing: ${variable}`);
    throw new EnvError({});
  }
});

export const appConfig = {
  nodeEnv: process.env.NODE_ENV || "development",
  isTest: process.env.IS_TEST === "yes",
  name: process.env.APP_NAME as string,
  auth: {
    baseURL: process.env.BETTER_AUTH_BASE_URL as string,
    secret: process.env.AUTH_SECRET as string,
    db: {
      url: process.env.DATABASE_URL as string,
    },
    socialProviders: {
      google: {
        id: process.env.AUTH_GOOGLE_ID as string,
        secret: process.env.AUTH_GOOGLE_SECRET as string,
      },
      github: {
        id: process.env.AUTH_GITHUB_ID as string,
        secret: process.env.AUTH_GITHUB_SECRET as string,
      },
    },
  },
  api: {
    url: process.env.API_URL as string,
  },
  email: {
    id: process.env.EMAIL_ID as string,
    password: process.env.EMAIL_PASSWORD as string,
  },
};
