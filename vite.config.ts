import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import eslintPlugin from "@nabla/vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig((props) => {
  const env = loadEnv(props.mode, process.cwd(), "VITE_DEV");
  const envWithProcessPrefix = {
    "process.env": `${JSON.stringify(env)}`,
  };

  return {
    plugins: [react(), eslintPlugin()],
    server: {
      port: 3001,
    },
    resolve: {
      alias: {
        "~": path.resolve(__dirname, "src"),
      },
    },
    define: envWithProcessPrefix,
    build: {
      outDir: 'dist',
    }
  }
});
