import { createFileRoute } from "@tanstack/react-router";
import Contact from "../components/Contact";
import Experience from "../components/Experience";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navigation from "../components/Navigation";
import Projects from "../components/Projects";
import Skills from "../components/Skills";

export const Route = createFileRoute("/")({ component: Portfolio });

function Portfolio() {
	return (
		<div className="min-h-screen bg-background">
			<Navigation />
			<main>
				<Hero />
				<Experience />
				<Skills />
				<Projects />
				<Contact />
			</main>
			<Footer />
		</div>
	);
}
