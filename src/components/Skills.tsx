import { Code, Palette, TestTube, Wrench } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

const containerVariants = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.04 },
	},
};

const badgeVariants = {
	hidden: { opacity: 0, scale: 0.8 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.3,
			ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
		},
	},
};

export default function Skills() {
	const { t } = useTranslation();

	const skillCategories = [
		{
			icon: <Code className="w-6 h-6" aria-hidden="true" />,
			title: t("skills.categories.frontend"),
			skills: [
				"React",
				"Next.js",
				"TypeScript",
				"JavaScript",
				"TanStack Query",
				"TanStack Router",
				"React Router",
				"Redux",
				"i18next",
				"WebSockets",
			],
		},
		{
			icon: <Palette className="w-6 h-6" aria-hidden="true" />,
			title: t("skills.categories.styling"),
			skills: [
				"Tailwind CSS",
				"SCSS/SASS",
				"Styled Components",
				"CSS-in-JS",
				"MUI (Material UI)",
				"Responsive Design",
				"Mobile-First",
			],
		},
		{
			icon: <TestTube className="w-6 h-6" aria-hidden="true" />,
			title: t("skills.categories.testing"),
			skills: [
				"Jest",
				"Vitest",
				"React Testing Library",
				"PlayWright",
				"Unit Testing",
				"Integration Testing",
			],
		},
		{
			icon: <Wrench className="w-6 h-6" aria-hidden="true" />,
			title: t("skills.categories.tools"),
			skills: [
				"Git",
				"GitHub",
				"MirageJS",
				"Jenkins",
				"Vite",
				"Figma",
				"RESTful APIs",
				"Firebase",
				"ApexCharts",
				"CI/CD",
			],
		},
	];

	return (
		<section
			id="skills"
			className="py-24 px-6 bg-background"
			aria-labelledby="skills-title"
		>
			<div className="max-w-6xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
					className="mb-14"
				>
					<h2
						id="skills-title"
						className="font-display font-black text-4xl md:text-5xl text-text"
					>
						<span className="text-primary">#</span> {t("skills.title")}
					</h2>
					<div className="mt-3 w-16 h-0.5 bg-gradient-to-r from-primary to-secondary" />
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
					{skillCategories.map((category, catIndex) => (
						<motion.article
							key={category.title}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-60px" }}
							transition={{
								duration: 0.5,
								delay: catIndex * 0.07,
								ease: [0.22, 1, 0.36, 1],
							}}
							className="bg-surface-raised border border-white/5 rounded-2xl p-6 group hover:border-primary/25 transition-all duration-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.07)]"
						>
							<div className="flex items-center gap-3 mb-5">
								<div className="text-primary group-hover:scale-110 transition-transform duration-300">
									{category.icon}
								</div>
								<h3 className="font-display font-bold text-lg text-text">
									{category.title}
								</h3>
							</div>

							<motion.div
								variants={containerVariants}
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true, margin: "-40px" }}
								className="flex flex-wrap gap-2"
							>
								{category.skills.map((skill) => (
									<motion.span
										key={skill}
										variants={badgeVariants}
										whileHover={{ scale: 1.06, y: -2 }}
										className="px-3 py-1.5 rounded-lg text-sm font-medium bg-primary/8 text-primary border border-primary/15 cursor-default transition-colors duration-200 hover:bg-primary/15"
									>
										{skill}
									</motion.span>
								))}
							</motion.div>
						</motion.article>
					))}
				</div>
			</div>
		</section>
	);
}
