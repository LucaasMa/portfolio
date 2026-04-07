import { Globe } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
	const { i18n } = useTranslation();

	const toggleLanguage = () => {
		const newLang = i18n.language === "en" ? "pt" : "en";
		i18n.changeLanguage(newLang);
	};

	return (
		<button
			type="button"
			onClick={toggleLanguage}
			className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/40 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:ring-offset-background"
			aria-label={`Switch language to ${i18n.language === "en" ? "Portuguese" : "English"}`}
		>
			<Globe className="w-3.5 h-3.5 text-primary" />
			<span className="text-text font-medium text-xs uppercase tracking-wider">
				{i18n.language === "en" ? "PT" : "EN"}
			</span>
		</button>
	);
}
