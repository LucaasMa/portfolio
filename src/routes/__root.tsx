import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { MotionConfig } from "motion/react";
import { lazy, Suspense } from "react";

import "../i18n/config";
import appCss from "../styles.css?url";

const TanStackDevtools = import.meta.env.DEV
	? lazy(() =>
			import("@tanstack/react-devtools").then((mod) => ({
				default: mod.TanStackDevtools,
			})),
		)
	: () => null;

const TanStackRouterDevtoolsPanel = import.meta.env.DEV
	? lazy(() =>
			import("@tanstack/react-router-devtools").then((mod) => ({
				default: mod.TanStackRouterDevtoolsPanel,
			})),
		)
	: () => null;

const SITE_URL = "https://lucasmauricio.com.br";
const TITLE =
	"Lucas Mauricio | Frontend Software Engineer — React, Next.js & TypeScript";
const DESCRIPTION =
	"Frontend Software Engineer with 4+ years of experience building fast, maintainable production web applications with React, Next.js, TypeScript, Design Systems, Web Performance, REST APIs, and Node.js.";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: TITLE },
			{ name: "description", content: DESCRIPTION },
			{ name: "theme-color", content: "#ffffff" },
			{ property: "og:title", content: TITLE },
			{ property: "og:description", content: DESCRIPTION },
			{ property: "og:type", content: "website" },
			{ property: "og:url", content: SITE_URL },
			{ property: "og:locale", content: "en_US" },
			{ property: "og:locale:alternate", content: "pt_BR" },
			{ property: "og:image", content: `${SITE_URL}/og-image.png` },
			{ property: "og:image:width", content: "1200" },
			{ property: "og:image:height", content: "630" },
			{ name: "twitter:card", content: "summary_large_image" },
			{ name: "twitter:title", content: TITLE },
			{ name: "twitter:description", content: DESCRIPTION },
			{ name: "twitter:image", content: `${SITE_URL}/og-image.png` },
		],
		links: [
			{ rel: "stylesheet", href: appCss },
			{ rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
			{ rel: "manifest", href: "/manifest.json" },
			// Only the faces that actually render above the fold.
			{
				rel: "preload",
				href: "/fonts/archivo-latin-variable-normal.woff2",
				as: "font",
				type: "font/woff2",
				crossOrigin: "anonymous",
			},
			{
				rel: "preload",
				href: "/fonts/ibm-plex-mono-latin-400-normal.woff2",
				as: "font",
				type: "font/woff2",
				crossOrigin: "anonymous",
			},
		],
	}),

	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	// `en` matches i18n's default (src/i18n/config.ts) so SSR and the first
	// client render agree. LanguageSwitcher keeps this in sync afterwards.
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				{/* reducedMotion="user" makes every motion animation on the site
				    respect the OS setting without per-component handling. */}
				<MotionConfig reducedMotion="user">{children}</MotionConfig>
				{import.meta.env.DEV && (
					<Suspense fallback={null}>
						<TanStackDevtools
							config={{ position: "bottom-right" }}
							plugins={[
								{
									name: "Tanstack Router",
									render: <TanStackRouterDevtoolsPanel />,
								},
							]}
						/>
					</Suspense>
				)}
				<Scripts />
			</body>
		</html>
	);
}
