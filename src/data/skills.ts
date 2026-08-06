export interface SkillCategory {
	/** i18n key under `skills.categories.*` */
	key: string;
	skills: string[];
}

export const skillCategories: SkillCategory[] = [
	{
		key: "frontend",
		skills: [
			"React",
			"Next.js",
			"TypeScript",
			"JavaScript",
			"TanStack Query",
			"TanStack Router",
			"Redux",
			"i18next",
			"WebSockets",
		],
	},
	{
		key: "styling",
		skills: [
			"Tailwind CSS",
			"SCSS/SASS",
			"Styled Components",
			"CSS-in-JS",
			"Material UI",
			"Responsive Design",
			"Mobile-First",
		],
	},
	{
		key: "testing",
		skills: [
			"Jest",
			"Vitest",
			"React Testing Library",
			"Playwright",
			"Cypress",
			"MirageJS",
			"Integration Testing",
		],
	},
	{
		key: "delivery",
		skills: [
			"Git (GitFlow)",
			"GitHub Actions",
			"Jenkins",
			"Vite",
			"Webpack",
			"Figma",
			"Core Web Vitals",
			"CI/CD",
		],
	},
];
