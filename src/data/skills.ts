export interface SkillCategory {
	/** i18n key under `skills.categories.*` */
	key: string;
	skills: string[];
}

export const skillCategories: SkillCategory[] = [
	{
		key: "frontend",
		skills: [
			"React.js",
			"Next.js",
			"TypeScript",
			"JavaScript (ES6+)",
			"React Native",
			"TanStack Query",
			"TanStack Virtual",
			"Redux / Redux Toolkit",
			"Node.js",
			"RESTful APIs",
			"Backend-for-Frontend (BFF)",
			"WebSockets",
			"Micro Frontends (Module Federation)",
		],
	},
	{
		key: "styling",
		skills: [
			"Design Systems",
			"Storybook",
			"Material UI (MUI)",
			"Tailwind CSS",
			"Styled Components",
			"Emotion",
			"SCSS / Sass",
			"Responsive & Mobile-First",
			"Web Accessibility (WCAG)",
		],
	},
	{
		key: "testing",
		skills: [
			"Jest",
			"Vitest",
			"React Testing Library",
			"Playwright",
			"Unit, Component & E2E Testing",
		],
	},
	{
		key: "delivery",
		skills: [
			"Git & GitHub Actions",
			"Jenkins CI/CD",
			"Vite & Webpack",
			"Claude Code & Cursor",
			"Web Performance & Core Web Vitals",
			"OIDC / SSO & WebDAV",
			"Agile / Scrum / Kanban",
		],
	},
];
