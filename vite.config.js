import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			strategies: 'network-first',
			manifest: {
				name: 'Sabores sin Fronteras',
				short_name: 'Sabores sin Fronteras',
				start_url: '/',
				description:
					'Viaja Por El Mundo. En Sabores Sin Fronteras Encontrarás Una Amplia Variedad De Recetas Internacionales, Desde Clásicos Italianos Hasta Exóticas Especias Asiáticas. ¡Descubre Nuevos Horizontes Culinarios!',
				display: 'standalone',
				background_color: '#dcbe9c',
				theme_color: '#dcbe9c',
				lang: 'en',
				scope: '/',
				icons: [
					{
						src: './food.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable',
					},
				],
			},
		}),
	],
})
