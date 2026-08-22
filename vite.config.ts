import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { execSync } from "child_process";

let version = "dev";
let commitMessage = "Development build";

try {
  const commitCount = execSync("git rev-list --count HEAD")
    .toString()
    .trim();

  const message = execSync("git log -1 --pretty=%s")
    .toString()
    .trim();

  version = `v1.${commitCount}`;
  commitMessage = message;
} catch {
  console.warn("Could not determine Git information.");
}

export default defineConfig({
  plugins: [react(), tailwindcss()],

  define: {
    __APP_VERSION__: JSON.stringify(version),
    __COMMIT_MESSAGE__: JSON.stringify(commitMessage),
  },
});