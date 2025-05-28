import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@shared/components/ui/card";

const guidelines = [
	"Provide a clear and concise description of your project",
	"Include high-quality screenshots that showcase your project",
	"Link to a live demo or GitHub repository if available",
	"Specify the areas where you need feedback the most",
	"Be open to constructive criticism and engage with reviewers",
];

export const Guidelines = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Submission Guidelines</CardTitle>
				<CardDescription>
					Follow these guidelines to increase your chances of receiving quality
					feedback
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ul className="space-y-2 text-sm">
					{guidelines.map((text) => (
						<li
							className="flex items-start gap-2"
							key={text.split(" ").slice(0, 2).join(" ")}
						>
							<div className="rounded-full bg-primary p-1 mt-0.5">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="h-3 w-3 text-primary-foreground"
								>
									<path d="M20 6 9 17l-5-5" />
								</svg>
							</div>
							<span>{text}</span>
						</li>
					))}
				</ul>
			</CardContent>
		</Card>
	);
};
