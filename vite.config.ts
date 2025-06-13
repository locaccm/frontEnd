import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT || "4173"),
    allowedHosts: ["frontend-service-782869810736.europe-west1.run.app"],
  },
});