import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import pt from "./locales/pt.json";

export const LANGUAGE_STORAGE_KEY = "lm.lang";

i18n.use(initReactI18next).init({
	resources: {
		en: { translation: en },
		pt: { translation: pt },
	},
	// Must stay a constant: SSR renders <html lang="pt">, so the first client
	// render has to match or React reports a hydration mismatch. The stored
	// preference is restored after hydration (see LanguageSwitcher).
	lng: "pt",
	fallbackLng: "pt",
	interpolation: {
		escapeValue: false,
	},
});

// Keep the document language in sync so screen readers use the right
// pronunciation rules and search engines index the right locale.
if (typeof document !== "undefined") {
	i18n.on("languageChanged", (lng) => {
		document.documentElement.lang = lng;
	});
}

export default i18n;
