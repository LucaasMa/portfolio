export interface ExperienceEntry {
	/** i18n key under `experience.*` */
	key: string;
	/** One entry per technology — the old comma-string could only ever
	 *  render as a grey paragraph. */
	technologies: string[];
	/** Screenshot for the card. Absent until the shot is taken; the card
	 *  falls back to a dashed slot captioned with what belongs there. */
	image?: string;
}

export const experiences: ExperienceEntry[] = [
	{
		key: "cpqd",
		technologies: [
			"React",
			"Next.js",
			"TypeScript",
			"Material UI",
			"TanStack Query",
			"TanStack Virtual",
			"Redux",
			"REST APIs",
			"BFF",
			"WebSockets",
			"Design Systems",
			"Storybook",
			"Micro Frontends (Module Federation)",
			"Jest",
			"React Testing Library",
			"Playwright",
			"Jenkins CI/CD",
			"WCAG",
		],
		image: "/media/work-cpqd.webp",
	},
	{
		key: "turing",
		technologies: [
			"React",
			"Next.js",
			"TypeScript",
			"Node.js",
			"Claude Code",
			"Cursor",
			"Code Review",
			"Technical Documentation",
			"Git",
			"Agile",
		],
		image: "/media/work-turing.webp",
	},
	{
		key: "mmarketplaces",
		technologies: [
			"React",
			"TypeScript",
			"Node.js",
			"REST APIs",
			"Redux",
			"Styled Components",
			"ApexCharts",
			"Vite",
			"Firebase",
			"Git",
		],
		image: "/media/work-mmarketplaces.webp",
	},
	{
		key: "cpqdIntern",
		technologies: [
			"React",
			"TypeScript",
			"Redux",
			"Material UI",
			"Styled Components",
			"Git",
		],
		image: "/media/work-cpqd-intern.webp",
	},
	{
		key: "hiit",
		technologies: [
			"React",
			"React Native",
			"JavaScript",
			"SCSS",
			"Material UI (MUI)",
			"Responsive Design",
			"Git",
		],
		image: "/media/work-hiit.webp",
	},
];
