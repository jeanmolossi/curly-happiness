import sharedConfig from '@repo/ui/tailwind.config';
import type { Config } from 'tailwindcss';

const config: Pick<Config, 'presets'> = {
	presets: [{
		...sharedConfig,
		content: [
			...sharedConfig.content,
			// h/t to https://www.willliu.com/blog/Why-your-Tailwind-styles-aren-t-working-in-your-Turborepo
			'../../packages/ui/src/**/*.{js,jsx,ts,tsx}',
		]
	}]
}

export default config;
