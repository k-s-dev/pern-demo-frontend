import { defineConfig } from "prisma/config";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();
loadEnvConfig(projectDir);

export default defineConfig({
  schema: "./",
  migrations: {
    path: "./migrations",
  },
  datasource: {
    // db url has to be sourced directly from process env for prisma cli commands
    url: process.env.DATABASE_URL as string,
  },
});
