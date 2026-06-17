import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// Infantaverse wiki frontmatter, layered on top of Starlight's docs schema.
// SOURCING POLICY: every lore article must carry `sources` (real user files)
// or be marked user-directed. `check_sources` (tools/) audits this at build time.
const infantaverse = z.object({
	/** Alternate names / titles the subject is known by. */
	aka: z.array(z.string()).default([]),
	/** Entity kind, e.g. "Player Character", "Infanta", "Faction", "Location", "Artifact". */
	entityType: z.string().optional(),
	/** Which canon campaign(s) this belongs to. */
	setting: z
		.array(z.enum(['temple-holdings', 'dead-mans-hand', 'starfall-tng', 'arcaneum', 'shared']))
		.default(['shared']),
	/** In-world dating (free text, e.g. "1491 DR"). */
	era: z.string().optional(),
	/** e.g. "Alive", "Dead", "Erased (Oblivia)", "Unknown". */
	status: z.string().optional(),
	affiliations: z.array(z.string()).default([]),
	location: z.string().optional(),
	/** Arc / session where the subject first appears. */
	firstAppearance: z.string().optional(),
	/** Infobox / hero image path under /public or src/assets. */
	image: z.string().optional(),
	/** Gallery image paths. */
	gallery: z.array(z.string()).default([]),
	/** Whether the subject is lore erased/forgotten by the Oblivia. */
	oblivia: z.boolean().default(false),
	/**
	 * SOURCING (required for lore). List the exact source files/passages this
	 * article draws from, or the single token "user-directed". Structural pages
	 * (home, category indexes) may use "structural".
	 */
	sources: z.array(z.string()).default([]),
	/** Set true for a placeholder awaiting source material. */
	needsSource: z.boolean().default(false),
});

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({ extend: infantaverse }),
	}),
};
