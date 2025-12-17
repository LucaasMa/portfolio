import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mozao")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div>Te amo ❤️!</div>;
}
