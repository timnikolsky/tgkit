import { defineConfig } from 'vitepress';
import { apiRef } from '../apiRef';
import { nodeCategories } from '../constants'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'TgKit',
	description: 'TgKit documentation',
	head: [['link', { rel: 'icon', href: '/icon.svg' }]],
	themeConfig: {
		logo: {
			light: '/logo.svg',
			dark: '/logo-dark.svg',
		},
		siteTitle: false,
		search: {
			provider: 'local',
		},
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Docs', link: '/docs/introduction/overview' },
			{ text: 'Guide', link: '/guide' },
			{ text: 'Reference', link: '/ref' },
		],
		sidebar: {
			'/docs/': [
				{
					text: 'Introduction',
					items: [
						{ text: 'Overview', link: '/docs/introduction/overview' },
						{ text: 'Getting started', link: '/docs/introduction/getting-started' },
					],
				},
			],
			'/guide/': [],
			'/ref/': nodeCategories.map((category) => ({
				text: category.text,
				items: apiRef.children
					?.filter((item) => item.kind === category.kind)
					.map((item) => ({
						text: item.name,
						link: `/ref/${item.name}`,
					})),
			})),
		},
		socialLinks: [
			{ icon: 'telegram', link: 'https://t.me/tgkit_community' },
			{ icon: 'github', link: 'https://github.com/timnikolsky/tgkit' },
		],
	},
	vite: {
		server: {
			allowedHosts: true,
		},
	},
});
