import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navigation() {
	const { t } = useTranslation();
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 50);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navItems = [
		{ label: t("nav.experience"), href: "#experience" },
		{ label: t("nav.skills"), href: "#skills" },
		{ label: t("nav.projects"), href: "#projects" },
		{ label: t("nav.contact"), href: "#contact" },
	];

	const handleNavClick = (
		e: React.MouseEvent<HTMLAnchorElement>,
		href: string,
	) => {
		e.preventDefault();
		setIsMenuOpen(false);
		const element = document.querySelector(href);
		element?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<nav
			className="fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-auto"
			aria-label="Main navigation"
		>
			<div
				className={`glass rounded-full px-5 py-3 flex items-center gap-2 transition-all duration-300 whitespace-nowrap ${
					isScrolled ? "bg-surface/60" : ""
				}`}
			>
				<button
					type="button"
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					className="font-display font-black text-xl text-text hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background rounded-lg px-2 mr-2 cursor-pointer"
					aria-label="Go to top"
				>
					LM
				</button>

				<div className="hidden md:flex items-center gap-1">
					{navItems.map((item) => (
						<a
							key={item.href}
							href={item.href}
							onClick={(e) => handleNavClick(e, item.href)}
							className="text-muted hover:text-text transition-colors duration-200 font-medium text-sm px-3 py-1.5 rounded-full hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 focus:ring-offset-background"
						>
							{item.label}
						</a>
					))}
				</div>

				<div className="hidden md:flex items-center ml-2">
					<LanguageSwitcher />
				</div>

				<div className="md:hidden flex items-center gap-2 ml-2">
					<LanguageSwitcher />
					<button
						type="button"
						onClick={() => setIsMenuOpen(!isMenuOpen)}
						className="text-muted hover:text-text p-1.5 hover:bg-white/5 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
						aria-label={isMenuOpen ? "Close menu" : "Open menu"}
						aria-expanded={isMenuOpen}
					>
						{isMenuOpen ? (
							<X className="w-5 h-5" aria-hidden="true" />
						) : (
							<Menu className="w-5 h-5" aria-hidden="true" />
						)}
					</button>
				</div>
			</div>

			{isMenuOpen && (
				<div className="md:hidden mt-2 glass rounded-2xl px-4 py-4 flex flex-col gap-1">
					{navItems.map((item) => (
						<a
							key={item.href}
							href={item.href}
							onClick={(e) => handleNavClick(e, item.href)}
							className="text-muted hover:text-text transition-colors duration-200 font-medium text-sm px-3 py-2.5 rounded-xl hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-primary"
						>
							{item.label}
						</a>
					))}
				</div>
			)}
		</nav>
	);
}
