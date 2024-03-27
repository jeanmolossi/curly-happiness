import { defineConfig, Options } from 'tsup'

export default defineConfig((options: Options) => ({
	...options,
	entry: ["src/**/*.ts", "src/**/*.tsx"],
	format: ["esm"],
	dts: true,
	minify: true,
	external: ["react"],
}))
