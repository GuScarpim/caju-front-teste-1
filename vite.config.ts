import { defineConfig, loadEnv } from "vite";
import viteCompression from 'vite-plugin-compression';
import react from "@vitejs/plugin-react";
import path from "path";
import eslintPlugin from "@nabla/vite-plugin-eslint";

export default defineConfig((props) => {
  const env = loadEnv(props.mode, process.cwd(), "VITE_DEV");
  const envWithProcessPrefix = {
    "process.env": `${JSON.stringify(env)}`,
  };

  return {
    plugins: [viteCompression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }), react(), eslintPlugin()],
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
      brotli: true,
      outDir: 'dist',
    }
  }
});
