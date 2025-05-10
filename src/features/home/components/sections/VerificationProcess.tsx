import { CheckCircle } from "lucide-react";

export const VerificationProcess = () => {
	return (
		<section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
			<div className="container px-4 md:px-6">
				<div className="grid gap-10 lg:grid-cols-2 items-center">
					<div className="space-y-4">
						<h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
							How Verification Works
						</h2>
						<p className="text-muted-foreground md:text-xl">
							Our multi-layered verification system ensures you receive quality
							feedback from qualified reviewers.
						</p>
						<ul className="grid gap-4">
							<li className="flex items-start gap-2">
								<div className="rounded-full bg-primary p-1">
									<CheckCircle className="h-4 w-4 text-primary-foreground" />
								</div>
								<div>
									<h3 className="font-medium">Identity Verification</h3>
									<p className="text-sm text-muted-foreground">
										Reviewers verify their identity through email, GitHub, or
										LinkedIn.
									</p>
								</div>
							</li>
							<li className="flex items-start gap-2">
								<div className="rounded-full bg-primary p-1">
									<CheckCircle className="h-4 w-4 text-primary-foreground" />
								</div>
								<div>
									<h3 className="font-medium">Expertise Validation</h3>
									<p className="text-sm text-muted-foreground">
										Reviewers demonstrate their expertise through skill
										assessments or portfolio review.
									</p>
								</div>
							</li>
							<li className="flex items-start gap-2">
								<div className="rounded-full bg-primary p-1">
									<CheckCircle className="h-4 w-4 text-primary-foreground" />
								</div>
								<div>
									<h3 className="font-medium">Feedback Quality Scoring</h3>
									<p className="text-sm text-muted-foreground">
										All feedback is rated for helpfulness, constructiveness, and
										actionability.
									</p>
								</div>
							</li>
							<li className="flex items-start gap-2">
								<div className="rounded-full bg-primary p-1">
									<CheckCircle className="h-4 w-4 text-primary-foreground" />
								</div>
								<div>
									<h3 className="font-medium">Community Moderation</h3>
									<p className="text-sm text-muted-foreground">
										Top contributors help moderate feedback to maintain quality
										standards.
									</p>
								</div>
							</li>
						</ul>
					</div>
					<div className="relative h-[420px] overflow-hidden rounded-xl bg-background p-4">
						<div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/20 z-10"></div>
						<img
							src="/placeholder.svg?height=800&width=1200"
							alt="Verification process illustration"
							className="w-full h-full object-cover"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};
