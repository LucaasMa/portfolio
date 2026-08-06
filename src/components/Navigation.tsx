import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";
import LanguageSwitcher from "./LanguageSwitcher";

const NAV_ITEMS = [
	{ id: "work", index: "01", key: "nav.work" },
	{ id: "stack", index: "02", key: "nav.stack" },
	{ id: "projects", index: "03", key: "nav.projects" },
	{ id: "contact", index: "04", key: "nav.contact" },
] as const;

export default function Navigation() {
	const { t, i18n } = useTranslation();
	const prefersReducedMotion = usePrefersReducedMotion();
	const [progress, setProgress] = useState(0);
	const [activeId, setActiveId] = useState<string | null>(null);

	// One scroll handler drives both the reading-progress rule and the
	// active nav item — cheaper than a listener plus an observer, and the
	// two can never disagree about where the reader is.
	useEffect(() => {
		let frame = 0;

		const measure = () => {
			frame = 0;
			const doc = document.documentElement;
			const span = doc.scrollHeight - doc.clientHeight;
			setProgress(span > 0 ? (doc.scrollTop / span) * 100 : 0);

			const mark = window.innerHeight * 0.35;
			let current: string | null = null;
			for (const item of NAV_ITEMS) {
				const el = document.getElementById(item.id);
				if (el && el.getBoundingClientRect().top <= mark) current = item.id;
			}
			setActiveId(current);
		};

		const onScroll = () => {
			if (frame === 0) frame = requestAnimationFrame(measure);
		};

		measure();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });
		return () => {
			if (frame) cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, []);

	const scrollBehavior: ScrollBehavior = prefersReducedMotion
		? "auto"
		: "smooth";

	const handleNavClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		id: string,
	) => {
		e.preventDefault();
		const el = document.getElementById(id);
		if (!el) return;
		const top = el.getBoundingClientRect().top + window.scrollY - 52;
		window.scrollTo({ top, behavior: scrollBehavior });
	};

	// Filenames are kept as-is; the space in the EN one is encoded here.
	const resumeHref =
		i18n.language === "pt"
			? "/curriculoLucasMauricio.pdf"
			: encodeURI("/Lucas_Mauricio_Software Engineer_Resume.pdf");

	return (
		<nav
			aria-label={t("a11y.mainNav")}
			className="fixed inset-x-0 top-0 z-50 bg-ink text-text-invert"
		>
			<div className="flex flex-wrap items-center justify-between gap-x-gutter gap-y-2 px-gutter py-2.5 font-mono text-meta uppercase">
				<a href="#top" className="whitespace-nowrap">
					Lucas Mauricio
				</a>

				<ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
					{NAV_ITEMS.map((item) => {
						const isActive = activeId === item.id;
						return (
							<li key={item.id}>
								<a
									href={`#${item.id}`}
									onClick={(e) => handleNavClick(e, item.id)}
									aria-current={isActive ? "true" : undefined}
									className={cn(
										"whitespace-nowrap border-b pb-0.5 transition-colors",
										isActive
											? "border-accent text-text-invert"
											: "border-transparent text-text-invert/60 hover:text-text-invert",
									)}
								>
									{item.index} {t(item.key)}
								</a>
							</li>
						);
					})}
				</ul>

				<div className="flex items-center gap-4">
					<a
						href={resumeHref}
						download
						className="border-b border-accent pb-0.5"
					>
						{t("nav.resume")}
					</a>
					<LanguageSwitcher />
				</div>
			</div>

			{/* Reading progress. A 2px rule, not a bar — it belongs to the
			    masthead rather than floating over the page. */}
			<div className="h-0.5 bg-rule-invert">
				<div
					className="h-0.5 bg-accent"
					style={{ width: `${progress}%` }}
					aria-hidden="true"
				/>
			</div>
		</nav>
	);
}
