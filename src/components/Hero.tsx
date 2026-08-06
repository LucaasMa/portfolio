import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

const EASE = [0.2, 0.7, 0.25, 1] as const;

const STATS = [
	{ labelKey: "hero.stats.coverage", value: "85%+" },
	{ labelKey: "hero.stats.load", value: "\u221290%" },
	{ labelKey: "hero.stats.devs", value: "30+" },
] as const;

export default function Hero() {
	const { t } = useTranslation();
	const prefersReducedMotion = usePrefersReducedMotion();
	const videoRef = useRef<HTMLVideoElement>(null);

	// No autoPlay attribute: deriving it from a media query would produce a
	// hydration mismatch, because the server cannot know the client's setting.
	// Driving playback here also means preload="none" holds until the band is
	// actually on screen, so the video never competes with the LCP text.
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		if (prefersReducedMotion) {
			video.pause();
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					video.play().catch(() => {
						/* autoplay refused — the poster stays, which is fine */
					});
				} else {
					video.pause();
				}
			},
			{ threshold: 0.15 },
		);

		observer.observe(video);
		return () => observer.disconnect();
	}, [prefersReducedMotion]);

	return (
		<header id="top" className="pt-[52px]">
			<div className="px-gutter pt-section pb-8 md:pb-12">
				<div className="mx-auto flex max-w-editorial flex-wrap items-end gap-x-10 gap-y-9">
					{/* Deliberately not animated: this is the LCP element. */}
					<h1 className="min-w-0 flex-[1_1_28rem] font-display text-mega font-extrabold uppercase">
						Lucas
						<br />
						Mauricio
					</h1>

					<motion.div
						initial={{ opacity: 0, y: 14 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
						className="flex flex-[1_1_23rem] flex-col gap-5"
					>
						<p className="font-body text-lg text-text-2">{t("hero.bio")}</p>

						{/* Three numbers, set as a ledger row under a 2px rule. */}
						<dl className="grid grid-cols-[repeat(auto-fit,minmax(7.5rem,1fr))] gap-4 border-t-2 border-rule-strong pt-3.5">
							{STATS.map((stat) => (
								<div key={stat.labelKey}>
									<dt className="mb-1 font-mono text-meta uppercase text-text-muted">
										{t(stat.labelKey)}
									</dt>
									<dd className="m-0 font-display text-stat font-bold">
										{stat.value}
									</dd>
								</div>
							))}
						</dl>
					</motion.div>
				</div>
			</div>

			{/* Full-bleed band. The video runs the whole width of the page —
			    it is the masthead rule, not an illustration in a column. */}
			<figure className="m-0">
				<div className="aspect-[24/9] min-h-[11rem] w-full overflow-hidden border-y-2 border-rule-strong bg-ink">
					<video
						ref={videoRef}
						className="h-full w-full object-cover"
						poster="/media/hero-poster.jpg"
						preload="none"
						muted
						loop
						playsInline
						aria-hidden="true"
						tabIndex={-1}
					>
						<source src="/media/hero.mp4" type="video/mp4" />
					</video>
				</div>
				<figcaption className="flex flex-wrap gap-x-6 gap-y-1.5 border-b border-rule px-gutter py-2.5 font-mono text-meta uppercase text-text-muted">
					<span>{t("hero.videoCaption")}</span>
					<span>Campinas, SP · UTC−3</span>
					<span className="text-accent">{t("hero.available")}</span>
				</figcaption>
			</figure>
		</header>
	);
}
