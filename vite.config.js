import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path, { resolve } from "path";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import compression from "vite-plugin-compression";
import { visualizer } from "rollup-plugin-visualizer";
import strip from "rollup-plugin-strip";

export default defineConfig({
  plugins: [
    react(),
    nodePolyfills(),
    compression({
      algorithm: "brotliCompress", // Use Brotli compression for better results
      ext: ".br",
      threshold: 10240, // Compress files larger than 10 KB
    }),
    visualizer({
      open: true, // Automatically opens the visualizer report in the browser after build
      filename: "visualizer-stats.html", // Specify the output file for the report
    }),
    strip({
      include: "src/**/*.js",
      function: ["console.*"],
    }),
  ],
  build: {
    outDir: "dist", // Specify the output directory
    minify: "esbuild",
    sourcemap: false, // Disable source maps for production builds
    emptyOutDir: true,
    cssCodeSplit: true, // Enable CSS code splitting
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"), // Specify your main entry point
      },
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          reactToast: ["@radix-ui/react-toast"],
          reactRouter: ["react-router", "react-router-dom"],
          solanaWalletAdapters: [
            "@solana/wallet-adapter-base",
            "@solana/wallet-adapter-react",
            "@solana/wallet-adapter-react-ui",
            "@solana/web3.js",
          ],
          hookForm: ["react-hook-form", "@hookform/resolvers"],
          utility: ["clsx", "class-variance-authority", "tailwind-merge"],
          cryptoLib: ["crypto-js", "crypto-browserify", "bs58"],
        },
        chunkSizeWarningLimit: 500, // Adjust to warn for large chunks
      },
    },
  },
  server: {
    host: "0.0.0.0", // Allow access from network devices
    port: 5173, // Set the development server port
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Shortcut for src directory
      buffer: "buffer",
      crypto: "crypto-browserify", // Polyfill for Node.js crypto module
    },
  },
  define: {
    global: "globalThis", // Use globalThis for Node.js global compatibility
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: "globalThis", // Ensure compatibility with libraries expecting global
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true, // Polyfill for Node.js process
          buffer: true,
        }),
      ],
    },
  },
});
