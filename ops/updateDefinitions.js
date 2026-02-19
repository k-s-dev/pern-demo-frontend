/**
 * - source backend definitions (schemas, types, interfaces, enums, ...)
 * - remove .js extension from imports for nexjs compilation
 */

import { exec } from "node:child_process";
import * as fs from "node:fs";
import { exit } from "node:process";

// no trailing slashes or dots
const SRC = "../backend/src/modules/nextDemo/lib/definitions";
const DST = "./src/lib/definitions/backend";

const src = SRC;
const dst = DST;

if (!fs.existsSync(src)) {
  console.log(`Path: ${p}, does not exist.`);
  exit(1);
}

[src, dst].forEach((p) => {
  if (p.search(/\.$/) !== -1) {
    console.log(`Path: ${p}, contains trailing dot.`);
    exit(1);
  }
  if (p.search(/\/$/) !== -1) {
    console.log(`Path: ${p}, contains trailing slash.`);
    exit(1);
  }
});

// trailing dot is intentional
const cmd = `rm -rf ${dst} && cp -rf ${src}/. ${dst}`;

exec(cmd, (err, _stdout, stderr) => {
  if (err) console.log(`err: ${err}`);
  if (stderr) console.log(`stderr: ${stderr}`);
  console.log("Update of definitions on frontend from backend completed.")
});

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
