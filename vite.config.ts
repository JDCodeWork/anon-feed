import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@features": path.resolve(__dirname, "./src/features"),
			"@components": path.resolve(__dirname, "./src/shared/components"),
			"@lib": path.resolve(__dirname, "./src/shared/lib"),
			"@hooks": path.resolve(__dirname, "./src/shared/hooks"),
		},
	},
});
