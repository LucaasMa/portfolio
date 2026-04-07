import { Briefcase, Calendar, MapPin } from "lucide-react";
import { motion } from "motion/react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";

export default function Experience() {
	const { t, i18n } = useTranslation();
	const isPt = i18n.language === "pt";

	const experiences = [
		{
			key: "turing",
			technologies:
				"Next.js, React, TypeScript, AI/ML Tooling, Prompt Engineering, Assertion Frameworks",
			countryCode: "US",
			countryName: { en: "United States", pt: "Estados Unidos" },
		},
		{
			key: "cpqd",
			technologies:
				"React, Next.js, TypeScript, TanStack Query, TanStack Router, SCSS, React Hook Form, Jest, Vitest, React Testing Library, MirageJS, i18next, WebSockets, Git, Jenkins",
			countryCode: "BR",
			countryName: { en: "Brazil", pt: "Brasil" },
		},
		{
			key: "mmarketplaces",
			technologies:
				"React, TypeScript, Redux, React Router, Styled Components, Vite, Firebase, GitHub, Mercado Livre API, Bling API",
			countryCode: "BR",
			countryName: { en: "Brazil", pt: "Brasil" },
		},
		{
			key: "hiit",
			technologies: "React, JavaScript, CSS, MUI (Material UI)",
			countryCode: null,
			countryName: { en: "International", pt: "Internacional" },
		},
	];

	return (
		<section
			id="experience"
			className="py-24 px-6 bg-surface"
			aria-labelledby="experience-title"
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
						id="experience-title"
						className="font-display font-black text-4xl md:text-5xl text-text"
					>
						<span className="text-primary">#</span> {t("experience.title")}
					</h2>
					<div className="mt-3 w-16 h-0.5 bg-gradient-to-r from-primary to-secondary" />
				</motion.div>

				<div className="relative">
					{/* Timeline spine */}
					<div
						className="absolute left-0 top-0 bottom-0 w-px hidden md:block"
						style={{
							background:
								"linear-gradient(to bottom, transparent 0%, rgba(99,102,241,0.3) 15%, rgba(99,102,241,0.3) 85%, transparent 100%)",
						}}
						aria-hidden="true"
					/>

					<div className="space-y-8 md:pl-10">
						{experiences.map((exp, index) => (
							<motion.article
								key={exp.key}
								initial={{ opacity: 0, x: -28 }}
								whileInView={{ opacity: 1, x: 0 }}
								viewport={{ once: true, margin: "-80px" }}
								transition={{
									duration: 0.55,
									delay: index * 0.08,
									ease: [0.22, 1, 0.36, 1],
								}}
								className="relative bg-surface-raised border border-white/5 rounded-2xl p-6 md:p-8 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(99,102,241,0.08)]"
							>
								{/* Timeline dot */}
								<div
									className="absolute -left-[2.6rem] top-8 w-3 h-3 rounded-full bg-primary/70 border-2 border-surface hidden md:block"
									aria-hidden="true"
								/>

								<div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-5">
									<div>
										<h3 className="font-display font-bold text-xl text-text mb-2">
											{t(`experience.${exp.key}.position`)}
										</h3>
										<div className="flex flex-wrap items-center gap-4 text-muted text-sm">
											<div className="flex items-center gap-1.5">
												<Briefcase
													className="w-3.5 h-3.5 text-primary"
													aria-hidden="true"
												/>
												<span>{t(`experience.${exp.key}.company`)}</span>
											</div>
											<div className="flex items-center gap-1.5">
												<MapPin
													className="w-3.5 h-3.5 text-primary"
													aria-hidden="true"
												/>
												<span>
													{t(`experience.${exp.key}.location`)} (
													{t(`experience.${exp.key}.type`)})
												</span>
											</div>
										</div>
									</div>
									<div className="flex items-center gap-2 whitespace-nowrap flex-wrap justify-end">
										<span className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-xs font-medium text-muted">
											{exp.countryCode ? (
												<ReactCountryFlag
													countryCode={exp.countryCode}
													svg
													style={{ width: "1.1em", height: "1.1em" }}
													aria-label={isPt ? exp.countryName.pt : exp.countryName.en}
												/>
											) : (
												<span aria-hidden="true">🌐</span>
											)}
											<span>- {isPt ? exp.countryName.pt : exp.countryName.en}</span>
										</span>
										<span className="flex items-center gap-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full px-3 py-1 text-xs font-medium">
											<Calendar className="w-3 h-3" aria-hidden="true" />
											{t(`experience.${exp.key}.period`)}
										</span>
									</div>
								</div>

								<ul className="space-y-2.5 mb-6">
									{(
										t(`experience.${exp.key}.description`, {
											returnObjects: true,
										}) as string[]
									).map((item, i) => (
										<li
											key={`${exp.key}-desc-${i}`}
											className="text-muted leading-relaxed flex gap-3 text-sm"
										>
											<span
												className="text-primary flex-shrink-0 mt-0.5"
												aria-hidden="true"
											>
												▸
											</span>
											<span>{item}</span>
										</li>
									))}
								</ul>

								<div>
									<h4 className="text-xs font-semibold text-primary mb-2 uppercase tracking-widest">
										{t("experience.technologies")}
									</h4>
									<p className="text-muted text-xs leading-relaxed">
										{exp.technologies}
									</p>
								</div>
							</motion.article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
