import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), nodePolyfills()],
  define: {
    "process.env": {},
  },
  resolve: {
    alias: {
      web3: "web3/dist/web3.min.js",
    },

    // or
    // alias: [
    //   {
    //     find: "web3",
    //     replacement: "web3/dist/web3.min.js",
    //   },
    // ],
  },
});
