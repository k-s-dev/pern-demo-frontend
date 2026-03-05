import { globSync, readFileSync, writeFileSync } from "node:fs";

// updateBackendImports("./src/features/auth/lib/auth.ts")

const dst = "./src/lib/definitions/backend";
const files = globSync(`${dst}/**/*.ts`);

files.forEach(async (file) => {
  await updateBackendImports(file);
});

export async function updateBackendImports(filePath) {
  const lines = readFileSync(filePath, "utf-8").split("\n");
  const newLines = [];
  lines.forEach((line) => {
    let newLine = line;
    const localImportIdx = line.search(/import.*\.js"/);
    if (localImportIdx !== -1) {
      newLine = line.replace("\.js", "");
    }
    const exportIdx = line.search(/export.*\.js"/);
    if (exportIdx !== -1) {
      newLine = line.replace("\.js", "");
    }
    newLines.push(newLine);
  });
  writeFileSync(filePath, newLines.join("\n"), { flag: "w+" });
}
