import { stat } from "node:fs/promises";
import { exec } from "node:child_process";
import { existsSync } from "node:fs";
import { exit } from "node:process";
import { promisify } from "node:util";

const execPromisified = promisify(exec);

export async function executeCommand(command, message) {
  try {
    const { stdout, stderr } = await execPromisified(command);
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
  } catch (error) {
    console.error(`exec error: ${error}`);
  }
  if (message) {
    console.log(message);
  }
}

export async function copyFromSrc(src, dst, copyCmd, message) {
  [src, dst].forEach((p) => checkPath(p));
  await executeCommand(copyCmd, message);
}

export function checkPath(path) {
  if (!existsSync(path)) {
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

export async function isDir(path) {
  const stats = await stat(path);
  return stats.isDirectory();
}
