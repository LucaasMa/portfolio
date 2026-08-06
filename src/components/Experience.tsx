import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { experiences } from "@/data/experience";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const GAP = 18;

export default function Experience() {
	const { t } = useTranslation();
	const prefersReducedMotion = usePrefersReducedMotion();
	const stripRef = useRef<HTMLDivElement>(null);
	const [position, setPosition] = useState(0);

	const measure = useCallback(() => {
		const strip = stripRef.current;
		if (!strip) return;
		const span = strip.scrollWidth - strip.clientWidth;
		setPosition(span > 0 ? strip.scrollLeft / span : 1);
	}, []);

	useEffect(() => {
		measure();
	}, [measure]);

	const nudge = (direction: 1 | -1) => {
		const strip = stripRef.current;
		if (!strip) return;
		const card = strip.firstElementChild;
		const step = card ? card.getBoundingClientRect().width + GAP : 400;
		strip.scrollBy({
			left: direction * step,
			behavior: prefersReducedMotion ? "auto" : "smooth",
		});
	};

	return (
		<section id="work" aria-labelledby="work-title" className="py-section">
			<div className="mx-auto flex max-w-editorial flex-wrap items-baseline justify-between gap-x-gutter gap-y-3 border-b-2 border-rule-strong px-gutter pb-3.5">
				<h2
					id="work-title"
					className="font-display text-section font-extrabold uppercase"
				>
					01 — {t("experience.title")}
				</h2>
				<div className="flex items-center gap-2.5">
					<span className="font-mono text-meta uppercase text-text-muted">
						{t("experience.scrollHint")}
					</span>
					<button
						type="button"
						onClick={() => nudge(-1)}
						aria-label={t("a11y.previousRole")}
						className="flex h-11 w-11 items-center justify-center border border-rule-strong transition-colors hover:bg-ink hover:text-text-invert"
					>
						<ArrowLeft className="h-4 w-4" aria-hidden="true" />
					</button>
					<button
						type="button"
						onClick={() => nudge(1)}
						aria-label={t("a11y.nextRole")}
						className="flex h-11 w-11 items-center justify-center border border-rule-strong transition-colors hover:bg-ink hover:text-text-invert"
					>
						<ArrowRight className="h-4 w-4" aria-hidden="true" />
					</button>
				</div>
			</div>

			{/* A strip, not a stack: five roles read as one continuous ledger
			    the reader pulls through, and the whole section stays one
			    screen tall no matter how long the track record gets. */}
			<div
				ref={stripRef}
				onScroll={measure}
				className="card-strip flex gap-[18px] overflow-x-auto px-gutter py-7"
			>
				{experiences.map((exp, index) => (
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
						className="flex w-[min(26.25rem,84vw)] shrink-0 flex-col gap-4 border border-rule bg-paper-sunk p-4"
					>
						<div className="aspect-[4/3] w-full overflow-hidden bg-well">
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

						<ul className="mt-auto flex flex-wrap gap-1.5 border-t border-rule pt-3">
							{exp.technologies.map((tech) => (
								<li
									key={tech}
									className="bg-chip px-2 py-1 font-mono text-chip uppercase text-text-muted"
								>
									{tech}
								</li>
							))}
						</ul>
					</motion.article>
				))}
			</div>

			{/* Position rule — tells the reader there is more to the right
			    without a scrollbar being the only signal. */}
			<div className="mx-auto max-w-editorial px-gutter">
				<div className="h-0.5 bg-rule">
					<div
						className="h-0.5 bg-ink transition-[width] duration-150"
						style={{ width: `${22 + position * 78}%` }}
						aria-hidden="true"
					/>
				</div>
			</div>
		</section>
	);
}
