export const appConfig = {
  nodeEnv: process.env.NODE_ENV || "development",
  upload: {
    method: process.env.UPLOAD_METHOD,
    vercelBlobKey: process.env.BLOB_READ_WRITE_TOKEN,
  },
};
