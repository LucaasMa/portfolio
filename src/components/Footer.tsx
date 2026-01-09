import { useTranslation } from "react-i18next";

export default function Footer() {
	const { t } = useTranslation();

	return (
		<footer className="bg-slate-900 border-t border-slate-800 py-8 px-6">
			<div className="max-w-6xl mx-auto">
				<div className="text-center">
					<p className="text-gray-500 text-sm flex items-center justify-center gap-2">
						{t("footer.built")} React, TanStack Start & Tailwind CSS
					</p>
				</div>
			</div>
		</footer>
	);
}
