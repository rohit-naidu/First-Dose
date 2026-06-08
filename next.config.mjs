import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root to this project — a stray lockfile in the home
  // directory otherwise confuses Next's root inference.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
