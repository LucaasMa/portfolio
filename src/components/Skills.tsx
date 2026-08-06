import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { skillCategories } from "@/data/skills";

export default function Skills() {
	const { t } = useTranslation();

	return (
		<section
			id="stack"
			aria-labelledby="stack-title"
			className="border-y border-rule bg-paper-sunk px-gutter py-section"
		>
			<div className="mx-auto max-w-editorial">
				<h2
					id="stack-title"
					className="mb-7 border-b-2 border-rule-strong pb-3.5 font-display text-section font-extrabold uppercase"
				>
					02 — {t("skills.title")}
				</h2>

				{/* Ledger rows, not a badge cloud: label in the left column,
				    the tools themselves set as plain running text. */}
				{skillCategories.map((category, index) => (
					<motion.div
						key={category.key}
						initial={{ opacity: 0, y: 12 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-40px" }}
						transition={{
							duration: 0.45,
							delay: index * 0.05,
							ease: [0.2, 0.7, 0.25, 1],
						}}
						className="flex flex-wrap gap-x-gutter gap-y-3 border-b border-rule py-5"
					>
						<h3 className="flex-[0_0_12.5rem] font-mono text-meta uppercase text-text-muted">
							<span className="text-accent">
								{String(index + 1).padStart(2, "0")}
							</span>{" "}
							{t(`skills.categories.${category.key}`)}
						</h3>
						<ul className="flex flex-[1_1_20rem] flex-wrap gap-x-6 gap-y-2">
							{category.skills.map((skill) => (
								<li key={skill} className="font-display font-medium">
									{skill}
								</li>
							))}
						</ul>
					</motion.div>
				))}
			</div>
		</section>
	);
}
