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
  name: process.env.APP_NAME as string,
  api: {
    url: {
      base: process.env.API_URL as string,
      auth: process.env.NEXT_PUBLIC_BETTER_AUTH_BASE_URL as string,
    },
  },
  upload: {
    method: process.env.UPLOAD_METHOD,
    vercelBlobKey: process.env.BLOB_READ_WRITE_TOKEN,
  },
};
