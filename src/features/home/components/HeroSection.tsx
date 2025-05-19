import { Button } from "@components/ui/button";
import { Link } from "react-router";

export const HeroSection = () => (
	<section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
		<div className="px-4 md:px-6 lg:px-8 xl:px-12">
			<div className="flex flex-col items-center justify-center space-y-4 text-center">
				<div className="space-y-2">
					<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
						Get Verified Feedback on Your Developer Projects
					</h1>
					<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
						Share your work, receive constructive criticism from verified
						experts, and improve your skills.
					</p>
				</div>
				<div className="flex flex-col gap-2 min-[400px]:flex-row">
					<Link to="/submit">
						<Button size="lg">Submit Your Project</Button>
					</Link>
					<Link to="/projects">
						<Button variant="outline" size="lg">
							Browse Projects
						</Button>
					</Link>
				</div>
			</div>
		</div>
	</section>
);
