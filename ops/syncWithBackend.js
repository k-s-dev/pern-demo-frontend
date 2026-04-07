/**
 * Sync with backend
 * - definitions (schemas, types, interfaces, enums, ...)
 *   - remove .js extension from imports for Nextjs compilation
 */

import { execSync } from "node:child_process";
import * as fs from "node:fs";
import { exit } from "node:process";
import { updateBackendImports } from "./updateBackendImports";

syncDefinitions();

async function syncDefinitions() {
  // no trailing slashes or dots
  const src = "../backend/src/modules/pernDemo/lib/definitions";
  const dst = "./src/lib/definitions/backend";
  // trailing dot is intentional
  const copyCmd = `rm -rf ${dst} && cp -rf ${src}/. ${dst}`;
  const message = "Sync of definitions on frontend from backend completed.";
  copyFromSrc(src, dst, copyCmd, message);
  await updateExtensions(dst);
}

function copyFromSrc(src, dst, copyCmd, message) {
  [src, dst].forEach((p) => checkPath(p));

  try {
    const stdout = execSync(copyCmd);
    console.log("stdout: " + stdout); // 'stdout: Hello\n'
    console.log(message);
  } catch (err) {
    console.error("Error: " + err.toString());
  }
}

function checkPath(path) {
  if (!fs.existsSync(path)) {
    console.log(`Path: ${path}, does not exist.`);
    exit(1);
  }

  if (path.search(/\.$/) !== -1) {
    console.log(`Path: ${path}, contains trailing dot.`);
    exit(1);
  }
  if (path.search(/\/$/) !== -1) {
    console.log(`Path: ${path}, contains trailing slash.`);
    exit(1);
  }
}

async function updateExtensions(dst) {
  // get all files in definitions
  const files = fs.globSync(`${dst}/**/*.ts`);

  files.forEach(async (file) => {
    await updateBackendImports(file);
  });
}
