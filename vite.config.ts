import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
export default defineConfig({
  resolve: {
    alias: {
      "@api": resolve(__dirname, "src", "api"),
      "@common": resolve(__dirname, "src", "common"),
      "@config": resolve(__dirname, "src", "config"),
      "@core": resolve(__dirname, "src", "core"),
      "@pages": resolve(__dirname, "src", "pages"),
      "@components": resolve(__dirname, "src", "components"),
      "@stores": resolve(__dirname, "src", "stores"),
      "@services": resolve(__dirname, "src", "services"),
      "@utils": resolve(__dirname, "src", "utils"),
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api/': {
        target: 'https://api.learningcamp.cn/web/api/', // 目标地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // 可选的重写路径
      }
    }
  }
});
