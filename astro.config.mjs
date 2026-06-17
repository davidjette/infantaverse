// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// Deployed to GitHub Pages as a project site at https://davidjette.github.io/infantaverse/
const BASE = '/infantaverse';

// Astro does not prepend `base` to root-relative links written by hand in
// markdown/MDX content (e.g. `[Calix](/characters/calix/)`). Starlight handles
// its own generated links (sidebar, etc.), but inline content links would 404
// under a project-page base path. This rehype plugin rewrites any root-relative
// <a href="/..."> to include the base, so content links work both in `astro dev`
// (served under the base) and in production. Zero-dependency tree walk.
function rehypeBaseLinks() {
	/** @param {any} node */
	const walk = (node) => {
		if (
			node.tagName === 'a' &&
			node.properties &&
			typeof node.properties.href === 'string'
		) {
			const href = node.properties.href;
			if (
				href.startsWith('/') &&
				!href.startsWith('//') &&
				href !== BASE &&
				!href.startsWith(BASE + '/')
			) {
				node.properties.href = BASE + href;
			}
		}
		if (node.children) node.children.forEach(walk);
	};
	/** @param {any} tree */
	return (tree) => walk(tree);
}

export default defineConfig({
	site: 'https://davidjette.github.io',
	base: BASE,
	markdown: {
		rehypePlugins: [rehypeBaseLinks],
	},
	integrations: [
		starlight({
			title: 'The Infantaverse',
			description: 'A community wiki for the Infantaverse — a shared D&D multi-campaign setting.',
			customCss: ['./src/styles/homebrewery.css'],
			// Search (Pagefind) is built in for production builds.
			sidebar: [
				{ label: 'Overview', items: [{ label: 'Home', slug: '' }] },
				{ label: 'Campaigns', items: [{ autogenerate: { directory: 'campaigns' } }] },
				{ label: 'Characters', collapsed: true, items: [{ autogenerate: { directory: 'characters' } }] },
				{ label: 'Factions', collapsed: true, items: [{ autogenerate: { directory: 'factions' } }] },
				{ label: 'Locations', collapsed: true, items: [{ autogenerate: { directory: 'locations' } }] },
				{ label: 'Items & Artifacts', collapsed: true, items: [{ autogenerate: { directory: 'items' } }] },
				{ label: 'Bestiary', collapsed: true, items: [{ autogenerate: { directory: 'creatures' } }] },
				{ label: 'Concepts & Cosmology', collapsed: true, items: [{ autogenerate: { directory: 'concepts' } }] },
				{ label: 'Events & Arcs', collapsed: true, items: [{ autogenerate: { directory: 'events' } }] },
			],
		}),
	],
});
