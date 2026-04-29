import pino from "pino";
import { appConfig } from "../config";

const transport = pino.transport({
  targets: [
    {
      target: "pino-pretty",
      level:
        appConfig.nodeEnv === "development"
          ? "debug"
          : appConfig.nodeEnv === "test"
            ? "silent"
            : "error",
      options: {
        destination: 1,
        colorize: true,
        singleLine: true,
      },
    },
  ],
});

export const logger = pino(
  {
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  transport,
);
