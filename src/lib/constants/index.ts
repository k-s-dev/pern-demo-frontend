export const APP_REQUIRED_ENV_VARIABLES = [
  "NODE_ENV",
  "APP_NAME",
  "AUTH_SECRET",
  // NODE_ENV specific
  "API_URL",
  "TRUSTED_ORIGINS",
  "DATABASE_URL",
  "BETTER_AUTH_BASE_URL",
  "AUTH_GOOGLE_ID",
  "AUTH_GOOGLE_SECRET",
  "AUTH_GITHUB_ID",
  "AUTH_GITHUB_SECRET",
];

export const LIMIT = {
  upload: {
    image: {
      value: 5,
      unit: "MB",
      label: "5 MB",
    },
  },
};

export const tags = {
  session: {
    tag: "session",
    profile: { expire: 0 },
  },
};

export const ERROR_MESSAGES = {
  internalServer: "Internal server error. Please try again.",
  unauthorized: "Unauthorized access. Permission denied.",
};
