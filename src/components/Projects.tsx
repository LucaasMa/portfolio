import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { projects } from "@/data/projects";
import { cn } from "@/lib/cn";

export default function Projects() {
	const { t } = useTranslation();

	return (
		<section
			id="projects"
			aria-labelledby="projects-title"
			className="px-gutter py-section"
		>
			<div className="mx-auto max-w-editorial">
				<h2
					id="projects-title"
					className="mb-9 border-b-2 border-rule-strong pb-3.5 font-display text-section font-extrabold uppercase"
				>
					03 — {t("projects.title")}
				</h2>

				{projects.map((project, index) => {
					const isMirrored = index % 2 === 1;
					const isLast = index === projects.length - 1;

					return (
						<motion.article
							key={project.key}
							initial={{ opacity: 0, y: 18 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-50px" }}
							transition={{ duration: 0.5, ease: [0.2, 0.7, 0.25, 1] }}
							className={cn(
								"flex gap-x-8 gap-y-6",
								isMirrored ? "flex-wrap-reverse" : "flex-wrap",
								!isLast && "mb-10 border-b border-rule pb-10",
							)}
						>
							<div
								className={cn(
									"aspect-[16/10] flex-[1_1_26rem] overflow-hidden border border-rule bg-well",
									isMirrored && "order-2",
								)}
							>
								{project.media ? (
									<img
										src={project.media.src}
										srcSet={project.media.srcSet}
										width={project.media.width}
										height={project.media.height}
										alt={t(project.media.altKey)}
										loading="lazy"
										decoding="async"
										className="h-full w-full object-cover"
									/>
								) : (
									<div className="flex h-full w-full items-center justify-center border border-dashed border-rule p-6 text-center font-mono text-meta uppercase text-text-muted">
										{t(`projects.${project.key}.shot`)}
									</div>
								)}
							</div>

							<div
								className={cn(
									"flex flex-[1_1_21rem] flex-col justify-center gap-3.5",
									isMirrored && "order-1",
								)}
							>
								<p className="font-mono text-meta uppercase text-accent">
									{t(project.eyebrowKey)}
								</p>
								<h3 className="font-display text-project font-bold">
									{t(`projects.${project.key}.title`)}
								</h3>
								<p className="max-w-measure font-body text-base text-text-2">
									{t(`projects.${project.key}.description`)}
								</p>
								<ul className="flex flex-wrap gap-x-5 gap-y-2.5">
									{project.links.map((link) => (
										<li key={link.href}>
											<a
												href={link.href}
												target="_blank"
												rel="noopener noreferrer"
												className="group inline-flex items-center gap-1.5 border-b-2 border-accent pb-0.5 font-mono text-meta uppercase"
											>
												{link.text}
												<ArrowUpRight
													className="h-3 w-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
													aria-hidden="true"
												/>
											</a>
										</li>
									))}
								</ul>
							</div>
						</motion.article>
					);
				})}
			</div>
		</section>
	);
}
