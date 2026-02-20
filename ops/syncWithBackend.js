/**
 * Sync with backend
 * - definitions (schemas, types, interfaces, enums, ...)
 *   - remove .js extension from imports for nexjs compilation
 * - README.md
 */

import { exec } from "node:child_process";
import * as fs from "node:fs";
import { exit } from "node:process";

syncDefinitions();
syncReadme();

function syncDefinitions() {
  // no trailing slashes or dots
  const src = "../backend/src/modules/nextDemo/lib/definitions";
  const dst = "./src/lib/definitions/backend";
  // trailing dot is intentional
  const copyCmd = `rm -rf ${dst} && cp -rf ${src}/. ${dst}`;
  const message = "Sync of definitions on frontend from backend completed.";
  copyFromSrc(src, dst, copyCmd, message);
  updateExtensions(dst);
}

function syncReadme() {
  // -- no trailing slashes or dots
  const src = "../backend/README.md";
  const dst = "./README.md";
  const copyCmd = `rm -rf ${dst} && cp -rf ${src} ${dst}`;
  const message = "Sync of README on frontend from backend completed.";
  copyFromSrc(src, dst, copyCmd, message);
}

function copyFromSrc(src, dst, copyCmd, message) {
  [src, dst].forEach((p) => checkPath(p));

  exec(copyCmd, (err, _stdout, stderr) => {
    if (err) console.log(`err: ${err}`);
    if (stderr) console.log(`stderr: ${stderr}`);
    console.log(message);
  });
}

function checkPath(path) {
  if (!fs.existsSync(path)) {
    console.log(`Path: ${p}, does not exist.`);
    exit(1);
  }

  if (path.search(/\.$/) !== -1) {
    console.log(`Path: ${p}, contains trailing dot.`);
    exit(1);
  }
  if (path.search(/\/$/) !== -1) {
    console.log(`Path: ${p}, contains trailing slash.`);
    exit(1);
  }
}

function updateExtensions(dst) {
  // get all files in definitions
  const files = fs.globSync(`${dst}/**/*.ts`);

  files.forEach((file) => {
    const lines = fs.readFileSync(file, "utf-8").split("\n");
    const newLines = [];
    lines.forEach((line) => {
      const localImportIdx = line.search(/import.*\.js"/);
      const prismaIdx = file.toString().search(/.*\/prisma\/.*/);
      let newLine = line;
      if (localImportIdx !== -1 && prismaIdx === -1) {
        newLine = line.replace("\.js", "");
      }
      newLines.push(newLine);
    });
    fs.writeFileSync(file, newLines.join("\n"), { flag: "w+" });
  });
}
