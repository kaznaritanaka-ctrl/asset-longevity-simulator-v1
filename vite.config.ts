import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// Static SPA build (Cloudflare Workers static assets).
// The simulator is fully client-side: Monte Carlo runs in a Web Worker,
// plans persist in localStorage, and sharing uses URL parameters.
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: true,
  },
  preview: {
    host: "127.0.0.1",
    port: 8081,
    strictPort: true,
  },
  resolve: { tsconfigPaths: true },
  plugins: [
    tanstackRouter({ target: "react" }),
    viteReact(),
    tailwindcss(),
  ],
});
