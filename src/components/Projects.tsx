import {
	ExternalLink,
	Github,
	GitPullRequest,
	Globe,
	Landmark,
} from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

interface ProjectLink {
	href: string;
	text: string;
	icon?: React.ReactNode;
}

interface ProjectCardProps {
	icon: React.ReactNode;
	badge: string;
	title: string;
	description: string;
	links: ProjectLink[];
	index: number;
}

function ProjectCard({
	icon,
	badge,
	title,
	description,
	links,
	index,
}: ProjectCardProps) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 32 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-60px" }}
			transition={{
				duration: 0.55,
				delay: index * 0.1,
				ease: [0.22, 1, 0.36, 1],
			}}
			className="relative bg-surface-raised border border-white/5 rounded-2xl p-8 group overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-[0_8px_40px_rgba(99,102,241,0.1)]"
		>
			{/* Hover shimmer */}
			<div
				className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
				style={{
					background:
						"linear-gradient(135deg, rgba(99,102,241,0.04) 0%, rgba(139,92,246,0.04) 100%)",
				}}
				aria-hidden="true"
			/>

			{/* Icon */}
			<div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-5 group-hover:scale-110 transition-transform duration-300">
				{icon}
			</div>

			{/* Badge */}
			<div className="mb-3">
				<span className="text-xs font-semibold text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-full uppercase tracking-wider">
					{badge}
				</span>
			</div>

			<h3 className="font-display font-bold text-xl text-text mb-3 group-hover:text-primary transition-colors duration-300">
				{title}
			</h3>

			<p className="text-muted text-sm leading-relaxed mb-6">{description}</p>

			<div className="flex flex-wrap items-center gap-4">
				{links.map((link) => (
					<a
						key={link.href}
						href={link.href}
						target="_blank"
						rel="noopener noreferrer"
						className="flex items-center gap-1.5 text-primary hover:text-accent text-sm font-medium transition-colors duration-200"
					>
						{link.icon}
						<span>{link.text}</span>
						<ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
					</a>
				))}
			</div>
		</motion.div>
	);
}

export default function Projects() {
	const { t } = useTranslation();

	return (
		<section
			id="projects"
			className="py-24 px-6 bg-surface"
			aria-labelledby="projects-title"
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
						id="projects-title"
						className="font-display font-black text-4xl md:text-5xl text-text"
					>
						<span className="text-primary">#</span> {t("projects.title")}
					</h2>
					<div className="mt-3 w-16 h-0.5 bg-gradient-to-r from-primary to-secondary" />
				</motion.div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<ProjectCard
						index={0}
						icon={
							<Landmark className="w-7 h-7 text-primary" aria-hidden="true" />
						}
						badge={t("projects.government")}
						title={t("projects.inspire.title")}
						description={t("projects.inspire.description")}
						links={[
							{
								href: "https://github.com/destaquesgovbr/portal",
								text: "GitHub",
								icon: <Github className="w-4 h-4" aria-hidden="true" />,
							},
							{
								href: "https://destaquesgovbr-portal-klvx64dufq-rj.a.run.app/",
								text: "Portal",
								icon: <Globe className="w-4 h-4" aria-hidden="true" />,
							},
						]}
					/>

					<ProjectCard
						index={1}
						icon={
							<GitPullRequest
								className="w-7 h-7 text-primary"
								aria-hidden="true"
							/>
						}
						badge={t("projects.contribution")}
						title={t("projects.roadmap.title")}
						description={t("projects.roadmap.description")}
						links={[
							{
								href: "https://github.com/kamranahmedse/developer-roadmap/issues/9420",
								text: "roadmap.sh",
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}
