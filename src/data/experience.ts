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
		key: "turing",
		technologies: [
			"Next.js",
			"React",
			"TypeScript",
			"Cursor (AI)",
			"Prompt Engineering",
			"Assertion Testing",
		],
		// image: "/media/work-turing.jpg",
	},
	{
		key: "cpqd",
		technologies: [
			"React",
			"Next.js",
			"TypeScript",
			"TanStack Query",
			"Redux",
			"WebSockets",
			"ApexCharts",
			"Playwright",
			"Jenkins CI/CD",
		],
		// image: "/media/work-cpqd.jpg",
	},
	{
		key: "cpqdIntern",
		technologies: [
			"React",
			"TypeScript",
			"Redux",
			"Material UI",
			"Styled Components",
		],
	},
	{
		key: "mmarketplaces",
		technologies: [
			"React",
			"TypeScript",
			"Redux",
			"ApexCharts",
			"Styled Components",
			"Vite",
			"Firebase",
		],
	},
	{
		key: "hiit",
		technologies: [
			"React",
			"JavaScript",
			"CSS3",
			"Material UI (MUI)",
			"Responsive Design",
		],
	},
];
