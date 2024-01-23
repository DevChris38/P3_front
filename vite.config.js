import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["react", "react-router", "react-router-dom"],
      input: {
        main: resolve(__dirname, "index.html"),
      },
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
