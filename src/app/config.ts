/**
 * load environment
 * requires NODE_ENV to be set
 */

import { APP_REQUIRED_ENV_VARIABLES } from "./constants";

APP_REQUIRED_ENV_VARIABLES.forEach((variable) => {
  const value = process.env[variable];
  if (!value || value === "") {
    console.log(`Environment variable missing: ${variable}`);
    throw new Error();
  }
});

export const appConfig = {
  nodeEnv: process.env.NODE_ENV || "development",
  api: {
    url: process.env.API_URL,
  },
  upload: {
    method: process.env.UPLOAD_METHOD,
    vercelBlobKey: process.env.VERCEL_BLOB_READ_WRITE_TOKEN,
  },
};
