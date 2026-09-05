import { readdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const registerTypescript = pathToFileURL(join(root, "scripts", "register-typescript.mjs")).href;

const coreTests = [
  "src/lib/fire/engine.test.ts",
  "src/lib/fire/math.test.ts",
  "src/lib/fire/share.test.ts",
  "src/lib/fire/validation.test.ts",
  "src/lib/app-data/app-data.test.ts",
  "src/lib/auth/gate-identity.test.ts",
];

function findTests(directory) {
  const found = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) found.push(...findTests(path));
    else if (entry.name.endsWith(".test.mjs")) found.push(path);
  }
  return found.sort();
}

const platformOnly = process.argv.slice(2).includes("--platform");
const testFiles = platformOnly
  ? findTests(join(root, "scripts"))
  : coreTests.map((path) => join(root, path));

console.log(`[tests] running ${testFiles.length} test files`);
for (const file of testFiles) console.log(`[tests] ${relative(root, file)}`);

const child = spawnSync(
  process.execPath,
  ["--experimental-strip-types", "--import", registerTypescript, "--test", ...testFiles],
  { cwd: root, stdio: "inherit" },
);

if (child.error) throw child.error;
process.exitCode = child.status ?? 1;
