import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { experiences } from "@/data/experience";
import { cn } from "@/lib/cn";

export default function Experience() {
	const { t } = useTranslation();

	return (
		<section
			id="work"
			aria-labelledby="work-title"
			className="px-gutter py-section"
		>
			<div className="mx-auto max-w-editorial">
				<h2
					id="work-title"
					className="mb-9 border-b-2 border-rule-strong pb-3.5 font-display text-section font-extrabold uppercase"
				>
					01 — {t("experience.title")}
				</h2>

				{/* A vertical ledger: one role per row, separated by a 1px rule.
				    No box around the entry — the rule carries the structure. */}
				{experiences.map((exp, index) => {
					const isLast = index === experiences.length - 1;

					return (
						<motion.article
							key={exp.key}
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: "-40px" }}
							transition={{
								duration: 0.45,
								delay: Math.min(index, 3) * 0.05,
								ease: [0.2, 0.7, 0.25, 1],
							}}
							className={cn(
								"flex flex-wrap gap-x-8 gap-y-5",
								!isLast && "mb-10 border-b border-rule pb-10",
							)}
						>
							<div className="aspect-[4/3] flex-[1_1_18rem] overflow-hidden border border-rule bg-well">
								{exp.image ? (
									<img
										src={exp.image}
										alt={t(`experience.${exp.key}.shot`)}
										width={800}
										height={600}
										loading="lazy"
										decoding="async"
										className="h-full w-full object-cover"
									/>
								) : (
									<div className="flex h-full w-full items-center justify-center border border-dashed border-rule p-4 text-center font-mono text-meta uppercase text-text-muted">
										{t(`experience.${exp.key}.shot`)}
									</div>
								)}
							</div>

							<div className="flex flex-[1_1_26rem] flex-col gap-3.5">
								<div className="flex items-baseline justify-between gap-3 font-mono text-meta uppercase text-text-muted">
									<span className="text-accent">
										{String(index + 1).padStart(2, "0")}
									</span>
									<span>{t(`experience.${exp.key}.period`)}</span>
								</div>

								<div>
									<h3 className="font-display text-xl font-bold">
										{t(`experience.${exp.key}.company`)}
									</h3>
									<p className="mt-1 font-mono text-meta uppercase text-text-muted">
										{t(`experience.${exp.key}.position`)} ·{" "}
										{t(`experience.${exp.key}.meta`)}
									</p>
								</div>

								<ul className="flex flex-col gap-2.5 font-body text-sm text-text-2">
									{(
										t(`experience.${exp.key}.description`, {
											returnObjects: true,
										}) as string[]
									).map((item) => (
										<li key={item.slice(0, 48)} className="flex gap-2.5">
											<span aria-hidden="true" className="shrink-0 text-accent">
												—
											</span>
											<span>{item}</span>
										</li>
									))}
								</ul>

								<ul className="flex flex-wrap gap-1.5 border-t border-rule pt-3">
									{exp.technologies.map((tech) => (
										<li
											key={tech}
											className="bg-chip px-2 py-1 font-mono text-chip uppercase text-text-muted"
										>
											{tech}
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
