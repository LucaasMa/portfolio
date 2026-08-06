import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
	const mql = window.matchMedia(QUERY);
	mql.addEventListener("change", onChange);
	return () => mql.removeEventListener("change", onChange);
}

function getSnapshot() {
	return window.matchMedia(QUERY).matches;
}

// The server cannot know the client's preference. Returning false keeps SSR
// and the first client render identical; useSyncExternalStore re-syncs
// immediately after hydration, so a toggle mid-session is picked up live.
function getServerSnapshot() {
	return false;
}

/**
 * Imperative reduced-motion signal.
 *
 * Most animation is handled declaratively by the CSS media query in
 * styles.css and <MotionConfig reducedMotion="user"> in __root.tsx. Use this
 * hook only where a decision must be made in JS — gating video playback,
 * choosing scroll behaviour.
 */
export function usePrefersReducedMotion(): boolean {
	return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
