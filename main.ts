import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const src = join(here, "entry.txt");
const dest = join(outDir, "entry.txt");
copyFileSync(src, dest);
// Verify the copy: read the output back and byte-compare with the source.
if (!readFileSync(dest).equals(readFileSync(src))) {
  throw new Error("entry.txt copy mismatch: output differs from source");
}
