import { useTranslation } from "react-i18next";

export default function Footer() {
	const { t } = useTranslation();

	return (
		<footer className="bg-surface border-t border-white/5 py-8 px-6">
			<div className="max-w-6xl mx-auto text-center">
				<p className="text-muted text-sm font-body">
					{t("footer.built")} React, TanStack Start & Tailwind CSS
				</p>
			</div>
		</footer>
	);
}
