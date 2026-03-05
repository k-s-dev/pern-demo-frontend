/**
 * Copy auth setup from backend
 * - auth.ts
 * - prisma
 */

import { readdir } from "node:fs/promises";
import { copyFromSrc, executeCommand } from "./utils";
import path from "node:path";
import { updateBackendImports } from "./updateBackendImports";

await copyAuthUtils();
await copyPrismaConfig();
await copyPrismaClient();

const files = globSync(`./src/**/*.ts`);
files.forEach(async (file) => {
  await updateBackendImports(file);
});

console.log(`
  - !!!adjust for errors!!!
  - configure prisma
    - prisma generated client is needed for auth
`);

async function copyPrismaClient() {
  // no trailing slashes or dots
  const src = "../backend/src/modules/nextDemo/lib/db/service.ts";
  const dst = "./src/features/auth/lib/db/service.ts";
  await executeCommand(`rm -rf ${dst}`);
  await executeCommand(`mkdir -p ${path.dirname(dst)}`);
  await executeCommand(`touch ${dst}`);
  const copyCmd = `cp -rf ${src} ${dst}`;
  const message = `Copy of prisma client from backend to frontend completed.`;
  await copyFromSrc(src, dst, copyCmd, message);
}

async function copyAuthUtils() {
  // no trailing slashes or dots
  const src = "../backend/src/modules/nextDemo/lib/auth/utils";
  const dst = "./src/features/auth/lib/utils";
  await executeCommand(`rm -rf ${dst}`);
  await executeCommand(`mkdir -p ${dst}`);
  // trailing dot is intentional
  const copyCmd = `cp -rf ${src}/. ${dst}`;
  const message = "Copy of auth utils from backend to frontend completed.";
  await copyFromSrc(src, dst, copyCmd, message);
}

async function copyPrismaConfig() {
  // no trailing slashes or dots
  const src = "../backend/src/modules/nextDemo/prisma";
  const dst = "./src/features/auth/prisma";
  await executeCommand(`rm -rf ${dst}`);
  await executeCommand(`mkdir -p ${dst}`);
  // trailing dot is intentional
  const copyCmd = `cp -rf ${src}/. ${dst}`;
  const message = "Copy of prisma from backend to frontend completed.";
  await copyFromSrc(src, dst, copyCmd, message);

  const paths = await readdir(dst, { recursive: true, withFileTypes: true });
  paths.forEach(async (p) => {
    if (p.isDirectory()) {
      if (p.name === "migrations") {
        await executeCommand(`rm -rf ./${p.parentPath + "/" + p.name}`);
      }
      if (
        p.name !== "models" &&
        p.name.includes("models") &&
        !p.name.includes("models/auth")
      ) {
        await executeCommand(`rm -rf ./${p.parentPath + "/" + p.name}`);
      }
    }
  });
}
