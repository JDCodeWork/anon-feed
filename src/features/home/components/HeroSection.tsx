import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";
import { Button } from "@shared/components/ui/button";
import { Link } from "react-router";

export const HeroSection = () => {
	const { openSignIn } = useClerk();

	return (
		<section className="w-full py-12 md:py-24 lg:py-32  relative overflow-hidden">
			<div
				className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800f_1px,transparent_1px),linear-gradient(to_bottom,#8080800f_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0f_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0f_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:linear-gradient(to_bottom,transparent_0%,black_30%,black_70%,transparent_100%)] mask-type:luminance"
			></div>

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
						<SignedIn>
							<Link to="/dashboard">
								<Button size="lg">Go to Dashboard</Button>
							</Link>
						</SignedIn>
						<SignedOut>
							<Button size="lg" onClick={() => openSignIn()}>
								Submit Your Project
							</Button>
						</SignedOut>
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
};
