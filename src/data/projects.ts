export interface ProjectLink {
	href: string;
	text: string;
}

export interface ProjectMedia {
	src: string;
	srcSet?: string;
	/** Required — explicit dimensions prevent layout shift. */
	width: number;
	height: number;
	/** i18n key, not a literal string: alt text is content. */
	altKey: string;
}

export interface Project {
	/** i18n key under `projects.*` */
	key: string;
	eyebrowKey: string;
	/** Absent until the screenshot lands; a captioned slot stands in. */
	media?: ProjectMedia;
	links: ProjectLink[];
}

export const projects: Project[] = [
	{
		key: "inspire",
		eyebrowKey: "projects.eyebrowGov",
		links: [
			{ href: "https://github.com/destaquesgovbr/portal", text: "GitHub" },
			{
				href: "https://destaquesgovbr-portal-klvx64dufq-rj.a.run.app/",
				text: "Portal",
			},
		],
	},
	{
		key: "roadmap",
		eyebrowKey: "projects.eyebrowOss",
		links: [
			{
				href: "https://github.com/kamranahmedse/developer-roadmap/issues/9420",
				text: "roadmap.sh",
			},
		],
	},
];
