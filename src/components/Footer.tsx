import { useTranslation } from "react-i18next";

export default function Footer() {
	const { t } = useTranslation();
	const year = new Date().getFullYear();

	return (
		<footer className="flex flex-wrap justify-between gap-x-gutter gap-y-2 px-gutter py-5 font-mono text-meta uppercase text-text-muted">
			<p className="m-0">
				© {year} Lucas Mauricio — {t("footer.rights")}
			</p>
			{/* A type credit is an editorial convention that doubles as the
			    typography signal — one line, no extra weight. */}
			<p className="m-0">{t("footer.typeCredit")}</p>
		</footer>
	);
}
