import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		host: true // or '0.0.0.0'
	},
	plugins: [sveltekit()]
});
