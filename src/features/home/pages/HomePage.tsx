import { useEffect } from "react";
import { FeaturedProjects } from "../components/FeaturedProjects";
import { HeroSection } from "../components/HeroSection";

const HomePage = () => {
	useEffect(() => {
		document.title = "AnonFeed";
	}, []);

	return (
		<>
			<HeroSection />
			<FeaturedProjects />
		</>
	);
};

export default HomePage;
