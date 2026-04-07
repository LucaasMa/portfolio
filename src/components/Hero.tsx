import { FileDown } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

function OrbitalRings() {
	return (
		<svg
			viewBox="0 0 400 400"
			aria-hidden="true"
			className="w-full h-full max-w-[480px] mx-auto"
		>
			{/* Crosshair lines */}
			<line
				x1="200"
				y1="0"
				x2="200"
				y2="400"
				stroke="#6366f1"
				strokeWidth="0.5"
				strokeOpacity="0.1"
			/>
			<line
				x1="0"
				y1="200"
				x2="400"
				y2="200"
				stroke="#6366f1"
				strokeWidth="0.5"
				strokeOpacity="0.1"
			/>

			{/* Center dot */}
			<circle cx="200" cy="200" r="4" fill="#6366f1" opacity="0.9" />
			<circle
				cx="200"
				cy="200"
				r="12"
				fill="none"
				stroke="#6366f1"
				strokeWidth="1"
				strokeOpacity="0.25"
			/>

			{/* Ring 1 — innermost, medium speed */}
			<g
				className="animate-spin-medium"
				style={{ transformOrigin: "200px 200px" }}
			>
				<circle
					cx="200"
					cy="200"
					r="60"
					fill="none"
					stroke="#6366f1"
					strokeWidth="1.5"
					strokeOpacity="0.5"
					strokeDasharray="4 10"
					strokeLinecap="round"
				/>
				<circle cx="260" cy="200" r="5.5" fill="#38bdf8" opacity="0.9" />
				<circle
					cx="260"
					cy="200"
					r="10"
					fill="none"
					stroke="#38bdf8"
					strokeWidth="0.5"
					strokeOpacity="0.3"
				/>
			</g>

			{/* Ring 2 — slow reverse */}
			<g
				className="animate-spin-slow-reverse"
				style={{ transformOrigin: "200px 200px" }}
			>
				<circle
					cx="200"
					cy="200"
					r="110"
					fill="none"
					stroke="#8b5cf6"
					strokeWidth="1"
					strokeOpacity="0.4"
					strokeDasharray="2 14"
					strokeLinecap="round"
				/>
				<circle cx="310" cy="200" r="4" fill="#8b5cf6" opacity="0.8" />
				<circle
					cx="310"
					cy="200"
					r="8"
					fill="none"
					stroke="#8b5cf6"
					strokeWidth="0.5"
					strokeOpacity="0.25"
				/>
			</g>

			{/* Ring 3 — slow forward */}
			<g
				className="animate-spin-slow"
				style={{ transformOrigin: "200px 200px" }}
			>
				<circle
					cx="200"
					cy="200"
					r="160"
					fill="none"
					stroke="#6366f1"
					strokeWidth="1"
					strokeOpacity="0.25"
					strokeDasharray="1 18"
					strokeLinecap="round"
				/>
				<circle cx="360" cy="200" r="3.5" fill="#6366f1" opacity="0.6" />
			</g>

			{/* Ring 4 — outermost, static */}
			<circle
				cx="200"
				cy="200"
				r="200"
				fill="none"
				stroke="#6366f1"
				strokeWidth="0.5"
				strokeOpacity="0.08"
				strokeDasharray="1 24"
			/>

			{/* Decorative arcs */}
			<path
				d="M 200,40 A 160,160 0 0,1 360,200"
				fill="none"
				stroke="url(#arcGrad)"
				strokeWidth="1"
				strokeOpacity="0.3"
			/>
			<defs>
				<linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
					<stop offset="50%" stopColor="#38bdf8" stopOpacity="0.8" />
					<stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
				</linearGradient>
			</defs>
		</svg>
	);
}

const fadeUpVariants = {
	hidden: { opacity: 0, y: 28 },
	visible: (i: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.65,
			delay: i * 0.13,
			ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
		},
	}),
};

export default function Hero() {
	const { t, i18n } = useTranslation();

	const scrollToContact = () => {
		document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
	};

	const getResumeFile = () => {
		return i18n.language === "pt"
			? "/curriculoLucasMauricio.pdf"
			: "/Lucas_Mauricio_Software Engineer_Resume.pdf";
	};

	return (
		<section
			className="min-h-screen flex items-center relative overflow-hidden px-6 py-24"
			aria-label="Hero section"
		>
			{/* Background: blueprint grid */}
			<div
				className="absolute inset-0 bg-blueprint-grid pointer-events-none"
				aria-hidden="true"
			/>

			{/* Orb 1 — top right */}
			<div
				className="absolute -top-48 -right-48 w-[700px] h-[700px] rounded-full animate-orb-1 pointer-events-none"
				style={{
					background:
						"radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 65%)",
				}}
				aria-hidden="true"
			/>

			{/* Orb 2 — bottom left */}
			<div
				className="absolute -bottom-48 -left-48 w-[600px] h-[600px] rounded-full animate-orb-2 pointer-events-none"
				style={{
					background:
						"radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 65%)",
				}}
				aria-hidden="true"
			/>

			{/* Orb 3 — accent top left, subtle */}
			<div
				className="absolute top-1/3 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none opacity-40"
				style={{
					background:
						"radial-gradient(circle, rgba(56,189,248,0.08) 0%, transparent 70%)",
				}}
				aria-hidden="true"
			/>

			{/* Watermark */}
			<div
				className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
				aria-hidden="true"
			>
				<span
					className="font-display font-black uppercase tracking-[0.2em] text-text whitespace-nowrap"
					style={{
						fontSize: "clamp(5rem, 18vw, 16rem)",
						opacity: 0.025,
						lineHeight: 1,
					}}
				>
					FRONT-END
				</span>
			</div>

			{/* Content grid */}
			<div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
				{/* Left — editorial text */}
				<div className="flex flex-col justify-center pt-8 lg:pt-0">
					<motion.p
						variants={fadeUpVariants}
						initial="hidden"
						animate="visible"
						custom={0 as number}
						className="text-accent text-sm font-medium tracking-[0.2em] uppercase mb-5"
					>
						{t("hero.greeting")}
					</motion.p>

					<motion.h1
						variants={fadeUpVariants}
						initial="hidden"
						animate="visible"
						custom={1 as number}
						className="font-display font-black text-text mb-3 leading-[0.92] tracking-tight"
						style={{ fontSize: "clamp(3.5rem, 8vw, 6.5rem)" }}
					>
						{t("hero.name")}
					</motion.h1>

					<motion.h2
						variants={fadeUpVariants}
						initial="hidden"
						animate="visible"
						custom={2 as number}
						className="font-display font-semibold mb-8"
						style={{ fontSize: "clamp(1.25rem, 3vw, 2rem)" }}
					>
						<span
							className="bg-clip-text text-transparent"
							style={{
								backgroundImage:
									"linear-gradient(90deg, #6366f1 0%, #8b5cf6 50%, #38bdf8 100%)",
							}}
						>
							{t("hero.title")}
						</span>
					</motion.h2>

					<motion.p
						variants={fadeUpVariants}
						initial="hidden"
						animate="visible"
						custom={3 as number}
						className="text-muted text-base leading-relaxed max-w-xl mb-10"
					>
						{t("hero.description")}
					</motion.p>

					<motion.div
						variants={fadeUpVariants}
						initial="hidden"
						animate="visible"
						custom={4 as number}
						className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
					>
						<button
							type="button"
							onClick={scrollToContact}
							className="px-8 py-3.5 bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl transition-all duration-300 animate-glow-pulse hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
							aria-label={t("hero.cta")}
						>
							{t("hero.cta")}
						</button>

						<a
							href={getResumeFile()}
							download
							className="glass px-8 py-3.5 text-text font-semibold rounded-xl hover:bg-white/10 flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
							aria-label={t("hero.viewResume")}
						>
							<FileDown className="w-5 h-5" />
							{t("hero.viewResume")}
						</a>
					</motion.div>
				</div>

				{/* Right — orbital SVG decoration */}
				<motion.div
					initial={{ opacity: 0, scale: 0.85 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 1.0, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
					className="hidden lg:flex items-center justify-center h-[480px]"
					aria-hidden="true"
				>
					<OrbitalRings />
				</motion.div>
			</div>
		</section>
	);
}
