import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LANGUAGE_STORAGE_KEY } from "@/i18n/config";
import { cn } from "@/lib/cn";

export default function LanguageSwitcher() {
	const { i18n, t } = useTranslation();
	const current = i18n.language === "en" ? "en" : "pt";

	// Restored after hydration only. Reading localStorage during render would
	// disagree with the server-rendered <html lang="pt"> and warn.
	useEffect(() => {
		const stored = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
		if ((stored === "pt" || stored === "en") && stored !== i18n.language) {
			i18n.changeLanguage(stored);
		}
	}, [i18n]);

	const toggle = () => {
		const next = current === "pt" ? "en" : "pt";
		i18n.changeLanguage(next);
		window.localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
	};

	return (
		<button
			type="button"
			onClick={toggle}
			aria-label={t("a11y.switchLanguage")}
			className="flex items-center gap-1.5 font-mono text-meta uppercase"
		>
			<span
				className={cn(
					current === "pt" ? "text-text-invert" : "text-text-invert/45",
				)}
			>
				PT
			</span>
			<span aria-hidden="true" className="text-text-invert/40">
				/
			</span>
			<span
				className={cn(
					current === "en" ? "text-text-invert" : "text-text-invert/45",
				)}
			>
				EN
			</span>
		</button>
	);
}
