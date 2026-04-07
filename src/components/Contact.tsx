import {
	Briefcase,
	Check,
	Code2,
	Copy,
	ExternalLink,
	Mail,
	MessageCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const containerVariants = {
	hidden: {},
	visible: {
		transition: { staggerChildren: 0.1 },
	},
};

const cardVariants = {
	hidden: { opacity: 0, y: 24 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
		},
	},
};

export default function Contact() {
	const { t } = useTranslation();
	const [copiedEmail, setCopiedEmail] = useState(false);

	const copyToClipboard = async (text: string) => {
		try {
			await navigator.clipboard.writeText(text);
			setCopiedEmail(true);
			setTimeout(() => setCopiedEmail(false), 2000);
		} catch (err) {
			console.error("Failed to copy:", err);
		}
	};

	const socialLinks = [
		{
			icon: <Code2 className="w-5 h-5" aria-hidden="true" />,
			label: "GitHub",
			href: "https://github.com/LucaasMa",
			ariaLabel: "Visit Lucas Mauricio GitHub profile",
		},
		{
			icon: <Briefcase className="w-5 h-5" aria-hidden="true" />,
			label: "LinkedIn",
			href: "https://www.linkedin.com/in/lucas-mauricio-6b1478211/",
			ariaLabel: "Visit Lucas Mauricio LinkedIn profile",
		},
	];

	return (
		<section
			id="contact"
			className="py-24 px-6 bg-background"
			aria-labelledby="contact-title"
		>
			<div className="max-w-4xl mx-auto">
				<motion.div
					initial={{ opacity: 0, y: 24 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-80px" }}
					transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
					className="mb-4"
				>
					<h2
						id="contact-title"
						className="font-display font-black text-4xl md:text-5xl text-text"
					>
						<span className="text-primary">#</span> {t("contact.title")}
					</h2>
					<div className="mt-3 w-16 h-0.5 bg-gradient-to-r from-primary to-secondary" />
				</motion.div>

				<motion.p
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
					className="text-muted leading-relaxed mb-12 max-w-xl"
				>
					{t("contact.description")}
				</motion.p>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-60px" }}
					className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8"
				>
					{/* Email */}
					<motion.button
						variants={cardVariants}
						type="button"
						onClick={() => copyToClipboard("lucasmauricio27@gmail.com")}
						className="bg-surface-raised border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.08)] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background group cursor-pointer text-left w-full"
						aria-label="Copy email to clipboard"
						whileHover={{ y: -2 }}
					>
						<div className="flex items-center justify-between gap-4">
							<div className="flex items-center gap-4">
								<div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
									<Mail className="w-5 h-5" aria-hidden="true" />
								</div>
								<div>
									<h3 className="text-xs font-semibold text-muted mb-1 uppercase tracking-widest">
										{t("contact.email")}
									</h3>
									<p className="text-text font-medium text-sm">
										lucasmauricio27@gmail.com
									</p>
								</div>
							</div>
							<div className="text-primary flex-shrink-0">
								{copiedEmail ? (
									<Check className="w-4 h-4" aria-hidden="true" />
								) : (
									<Copy className="w-4 h-4" aria-hidden="true" />
								)}
							</div>
						</div>
					</motion.button>

					{/* WhatsApp */}
					<motion.a
						variants={cardVariants}
						href="https://wa.me/5519998846691"
						target="_blank"
						rel="noopener noreferrer"
						className="bg-surface-raised border border-white/5 rounded-2xl p-6 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(99,102,241,0.08)] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background group cursor-pointer text-left flex items-center justify-between gap-4"
						aria-label="Open WhatsApp conversation"
						whileHover={{ y: -2 }}
					>
						<div className="flex items-center gap-4">
							<div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
								<MessageCircle className="w-5 h-5" aria-hidden="true" />
							</div>
							<div>
								<h3 className="text-xs font-semibold text-muted mb-1 uppercase tracking-widest">
									WhatsApp
								</h3>
								<p className="text-text font-medium text-sm">
									+55 (19) 99884-6691
								</p>
							</div>
						</div>
						<ExternalLink
							className="w-4 h-4 text-primary flex-shrink-0"
							aria-hidden="true"
						/>
					</motion.a>
				</motion.div>

				{/* Social links */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
				>
					<h3 className="text-sm font-semibold text-muted mb-4 uppercase tracking-widest">
						{t("contact.social")}
					</h3>
					<div className="flex flex-wrap gap-3">
						{socialLinks.map((social) => (
							<a
								key={social.label}
								href={social.href}
								target="_blank"
								rel="noopener noreferrer"
								className="glass flex items-center gap-2.5 rounded-full px-5 py-2.5 hover:bg-white/10 hover:border-primary/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background group"
								aria-label={social.ariaLabel}
							>
								<span className="text-primary group-hover:scale-110 transition-transform">
									{social.icon}
								</span>
								<span className="text-text font-medium text-sm">
									{social.label}
								</span>
								<ExternalLink
									className="w-3.5 h-3.5 text-muted group-hover:text-primary transition-colors"
									aria-hidden="true"
								/>
							</a>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
