import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import react from "@vitejs/plugin-react"
import macrosPlugin from "vite-plugin-babel-macros"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), macrosPlugin()],
})
