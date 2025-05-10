import { Footer, Header } from "../components/layout";
import {
	FeaturedProjects,
	HeroSection,
	VerificationProcess,
} from "../components/sections/";

export const HomePage = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-1">
				<HeroSection />
				<FeaturedProjects />
				<VerificationProcess />
			</main>
			<Footer />
		</div>
	);
};
