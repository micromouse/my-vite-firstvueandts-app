// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/myStudies/my-vite-firstvueandts-app/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/myStudies/my-vite-firstvueandts-app/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueSetupExtend from "file:///D:/myStudies/my-vite-firstvueandts-app/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
import AutoImport from "file:///D:/myStudies/my-vite-firstvueandts-app/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/myStudies/my-vite-firstvueandts-app/node_modules/unplugin-vue-components/dist/vite.mjs";
import eslintPlugin from "file:///D:/myStudies/my-vite-firstvueandts-app/node_modules/vite-plugin-eslint/dist/index.mjs";
import path, { resolve } from "path";
import fs from "fs";
import { createSvgIconsPlugin } from "file:///D:/myStudies/my-vite-firstvueandts-app/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { ElementPlusResolver } from "file:///D:/myStudies/my-vite-firstvueandts-app/node_modules/unplugin-vue-components/dist/resolvers.mjs";
var __vite_injected_original_dirname = "D:\\myStudies\\my-vite-firstvueandts-app";
var vite_config_default = defineConfig(({ mode }) => {
  const envConfig = loadEnv(mode, "./");
  return {
    plugins: [
      vue(),
      VueSetupExtend(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      eslintPlugin({
        include: ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
      }),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), "src/assets/images/svg")],
        symbolId: "icon-[dir]-[name]"
      })
    ],
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "./src"),
        path: "path-browserify"
      }
    },
    server: {
      host: envConfig.VITE_HOST,
      port: parseInt(envConfig.VITE_PORT),
      open: true,
      https: {
        cert: fs.readFileSync(path.join(__vite_injected_original_dirname, "public/ca/localhost+1.pem")),
        key: fs.readFileSync(path.join(__vite_injected_original_dirname, "public/ca/localhost+1-key.pem"))
      },
      ssr: false,
      base: envConfig.VITE_BASE_URL,
      outDir: envConfig.VITE_OUTPUT_DIR
    },
    define: {
      "process.env": { ...envConfig }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxteVN0dWRpZXNcXFxcbXktdml0ZS1maXJzdHZ1ZWFuZHRzLWFwcFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcbXlTdHVkaWVzXFxcXG15LXZpdGUtZmlyc3R2dWVhbmR0cy1hcHBcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L215U3R1ZGllcy9teS12aXRlLWZpcnN0dnVlYW5kdHMtYXBwL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCBWdWVTZXR1cEV4dGVuZCBmcm9tICd2aXRlLXBsdWdpbi12dWUtc2V0dXAtZXh0ZW5kJ1xyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xyXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xyXG5pbXBvcnQgZXNsaW50UGx1Z2luIGZyb20gJ3ZpdGUtcGx1Z2luLWVzbGludCdcclxuaW1wb3J0IHBhdGgsIHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcbmltcG9ydCBmcyBmcm9tICdmcydcclxuaW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXHJcbmltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXHJcblxyXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XHJcbiAgY29uc3QgZW52Q29uZmlnID0gbG9hZEVudihtb2RlLCAnLi8nKVxyXG4gIHJldHVybiB7XHJcbiAgICBwbHVnaW5zOiBbXHJcbiAgICAgIHZ1ZSgpLFxyXG4gICAgICBWdWVTZXR1cEV4dGVuZCgpLFxyXG4gICAgICBBdXRvSW1wb3J0KHtcclxuICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldXHJcbiAgICAgIH0pLFxyXG4gICAgICBDb21wb25lbnRzKHtcclxuICAgICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldXHJcbiAgICAgIH0pLFxyXG4gICAgICBlc2xpbnRQbHVnaW4oe1xyXG4gICAgICAgIGluY2x1ZGU6IFsnc3JjLyoqLyoudHMnLCAnc3JjLyoqLyouZC50cycsICdzcmMvKiovKi50c3gnLCAnc3JjLyoqLyoudnVlJ11cclxuICAgICAgfSksXHJcbiAgICAgIGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcclxuICAgICAgICAvLyBcdTYzMDdcdTVCOUFcdTk3MDBcdTg5ODFcdTdGMTNcdTVCNThcdTc2ODRcdTU2RkVcdTY4MDdcdTY1ODdcdTRFRjZcdTU5MzlcclxuICAgICAgICBpY29uRGlyczogW3Jlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaW1hZ2VzL3N2ZycpXSxcclxuICAgICAgICAvLyBcdTYzMDdcdTVCOUFzeW1ib2xJZFx1NjgzQ1x1NUYwRlxyXG4gICAgICAgIHN5bWJvbElkOiAnaWNvbi1bZGlyXS1bbmFtZV0nXHJcbiAgICAgIH0pXHJcbiAgICBdLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxyXG4gICAgICAgIHBhdGg6ICdwYXRoLWJyb3dzZXJpZnknXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgaG9zdDogZW52Q29uZmlnLlZJVEVfSE9TVCxcclxuICAgICAgcG9ydDogcGFyc2VJbnQoZW52Q29uZmlnLlZJVEVfUE9SVCksXHJcbiAgICAgIC8vIFx1NjYyRlx1NTQyNlx1ODFFQVx1NTJBOFx1NTcyOFx1NkQ0Rlx1ODlDOFx1NTY2OFx1NjI1M1x1NUYwMFxyXG4gICAgICBvcGVuOiB0cnVlLFxyXG4gICAgICAvLyBcdTY2MkZcdTU0MjZcdTVGMDBcdTU0MkYgaHR0cHNcclxuICAgICAgaHR0cHM6IHtcclxuICAgICAgICBjZXJ0OiBmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKF9fZGlybmFtZSwgJ3B1YmxpYy9jYS9sb2NhbGhvc3QrMS5wZW0nKSksXHJcbiAgICAgICAga2V5OiBmcy5yZWFkRmlsZVN5bmMocGF0aC5qb2luKF9fZGlybmFtZSwgJ3B1YmxpYy9jYS9sb2NhbGhvc3QrMS1rZXkucGVtJykpXHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIFx1NjcwRFx1NTJBMVx1N0FFRlx1NkUzMlx1NjdEM1xyXG4gICAgICBzc3I6IGZhbHNlLFxyXG4gICAgICBiYXNlOiBlbnZDb25maWcuVklURV9CQVNFX1VSTCxcclxuICAgICAgb3V0RGlyOiBlbnZDb25maWcuVklURV9PVVRQVVRfRElSXHJcbiAgICB9LFxyXG4gICAgZGVmaW5lOiB7XHJcbiAgICAgICdwcm9jZXNzLmVudic6IHsgLi4uZW52Q29uZmlnIH1cclxuICAgIH1cclxuICB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMFMsU0FBUyxjQUFjLGVBQWU7QUFDaFYsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sb0JBQW9CO0FBQzNCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sa0JBQWtCO0FBQ3pCLE9BQU8sUUFBUSxlQUFlO0FBQzlCLE9BQU8sUUFBUTtBQUNmLFNBQVMsNEJBQTRCO0FBQ3JDLFNBQVMsMkJBQTJCO0FBVHBDLElBQU0sbUNBQW1DO0FBWXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3hDLFFBQU0sWUFBWSxRQUFRLE1BQU0sSUFBSTtBQUNwQyxTQUFPO0FBQUEsSUFDTCxTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsTUFDSixlQUFlO0FBQUEsTUFDZixXQUFXO0FBQUEsUUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxNQUNuQyxDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsUUFDVCxXQUFXLENBQUMsb0JBQW9CLENBQUM7QUFBQSxNQUNuQyxDQUFDO0FBQUEsTUFDRCxhQUFhO0FBQUEsUUFDWCxTQUFTLENBQUMsZUFBZSxpQkFBaUIsZ0JBQWdCLGNBQWM7QUFBQSxNQUMxRSxDQUFDO0FBQUEsTUFDRCxxQkFBcUI7QUFBQSxRQUVuQixVQUFVLENBQUMsUUFBUSxRQUFRLElBQUksR0FBRyx1QkFBdUIsQ0FBQztBQUFBLFFBRTFELFVBQVU7QUFBQSxNQUNaLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLFFBQy9CLE1BQU07QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sTUFBTSxVQUFVO0FBQUEsTUFDaEIsTUFBTSxTQUFTLFVBQVUsU0FBUztBQUFBLE1BRWxDLE1BQU07QUFBQSxNQUVOLE9BQU87QUFBQSxRQUNMLE1BQU0sR0FBRyxhQUFhLEtBQUssS0FBSyxrQ0FBVywyQkFBMkIsQ0FBQztBQUFBLFFBQ3ZFLEtBQUssR0FBRyxhQUFhLEtBQUssS0FBSyxrQ0FBVywrQkFBK0IsQ0FBQztBQUFBLE1BQzVFO0FBQUEsTUFFQSxLQUFLO0FBQUEsTUFDTCxNQUFNLFVBQVU7QUFBQSxNQUNoQixRQUFRLFVBQVU7QUFBQSxJQUNwQjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sZUFBZSxFQUFFLEdBQUcsVUFBVTtBQUFBLElBQ2hDO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
