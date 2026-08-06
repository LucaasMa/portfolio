import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const EMAIL = "lucasmauricio27@gmail.com";

const LINKS = [
	{
		label: "GitHub",
		href: "https://github.com/LucaasMa",
		ariaKey: "a11y.visitGithub",
	},
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/lucas-mauricio-6b1478211/",
		ariaKey: "a11y.visitLinkedin",
	},
	{
		label: "WhatsApp",
		href: "https://wa.me/5519998846691",
		ariaKey: "a11y.openWhatsapp",
	},
] as const;

export default function Contact() {
	const { t } = useTranslation();
	const [copied, setCopied] = useState(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);

	const copyEmail = async () => {
		try {
			await navigator.clipboard.writeText(EMAIL);
			setCopied(true);
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
			timeoutRef.current = setTimeout(() => setCopied(false), 2000);
		} catch {
			/* clipboard unavailable — the address is visible on screen anyway */
		}
	};

	return (
		<section
			id="contact"
			aria-labelledby="contact-title"
			className="bg-ink px-gutter py-section text-text-invert"
		>
			<div className="mx-auto flex max-w-editorial flex-col gap-7">
				<h2
					id="contact-title"
					className="font-mono text-meta uppercase text-text-invert-muted"
				>
					04 — {t("contact.title")}
				</h2>

				<p className="max-w-measure font-body text-lg text-[#c9c5bc]">
					{t("contact.blurb")}
				</p>

				<div className="flex flex-wrap items-center gap-x-6 gap-y-4">
					<a
						href={`mailto:${EMAIL}`}
						className="font-display text-email font-extrabold break-words"
					>
						{EMAIL}
					</a>
					<button
						type="button"
						onClick={copyEmail}
						aria-label={t("a11y.copyEmail")}
						className="flex items-center gap-2 border border-[#4a4a4a] px-3.5 py-2.5 font-mono text-meta uppercase transition-colors hover:border-accent hover:bg-accent"
					>
						{copied ? (
							<Check className="h-3 w-3" aria-hidden="true" />
						) : (
							<Copy className="h-3 w-3" aria-hidden="true" />
						)}
						{copied ? t("contact.copied") : t("contact.copy")}
					</button>
				</div>

				<ul className="grid grid-cols-[repeat(auto-fit,minmax(9.375rem,1fr))] gap-x-5 gap-y-3.5 border-t border-rule-invert pt-5 font-mono text-meta uppercase text-text-invert-muted">
					{LINKS.map((link) => (
						<li key={link.href}>
							<a
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={t(link.ariaKey)}
								className="transition-colors hover:text-text-invert"
							>
								{link.label} ↗
							</a>
						</li>
					))}
					<li>+55 (19) 99884-6691</li>
				</ul>
			</div>

			<p aria-live="polite" className="sr-only">
				{copied ? t("a11y.emailCopied") : ""}
			</p>
		</section>
	);
}
