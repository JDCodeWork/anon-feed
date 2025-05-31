import { getAuth } from "@clerk/react-router/ssr.server";
import { Guidelines } from "@features/submit/components/Guidelines";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
	Tabs,
	TabsList,
	TabsTrigger,
} from "@shared/components/ui";
import { Link, Outlet, redirect } from "react-router";
import type { Route } from "./+types/submit";

export const meta = () => [
	{
		title: "Submit | AnonFeed",
	},
	{
		name: "description",
		content: "Submit your project to AnonFeed for feedback and visibility.",
	},
];

export async function loader(args: Route.LoaderArgs) {
	const { userId } = await getAuth(args);

	const {
		request: { url },
	} = args;
	const activeTab = url.split("/")[4];

	if (!userId) {
		return redirect("/");
	}

	return {
		activeTab: activeTab || "details",
	};
}

const SubmitLayout = ({ loaderData }: Route.ComponentProps) => {
	const { activeTab } = loaderData;

	return (
		<div className="max-w-5xl mx-auto my-8">
			<div className="flex flex-col gap-6">
				<div>
					<h1 className="text-3xl font-bold">Submit Your Project</h1>
					<p className="text-muted-foreground mt-1">
						Share your work with the community and receive valuable feedback
					</p>
				</div>

				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<CardTitle>Project Submission</CardTitle>
							<CardDescription>
								Fill out the form below to submit your project for feedback
							</CardDescription>
						</div>
					</CardHeader>
					<CardContent>
						<Tabs value={activeTab}>
							<TabsList className="grid w-full grid-cols-3">
								<TabsTrigger value="details">Project Details</TabsTrigger>
								<TabsTrigger value="media">Media & Links</TabsTrigger>
								<TabsTrigger value="feedback">Feedback Goals</TabsTrigger>
							</TabsList>

							<Outlet />
						</Tabs>
					</CardContent>
					<CardFooter className="flex flex-col gap-2 items-start">
						<p className="text-sm text-muted-foreground">
							By submitting your project, you agree to our{" "}
							<Link to="/terms" className="text-primary hover:underline">
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link to="/privacy" className="text-primary hover:underline">
								Privacy Policy
							</Link>
							.
						</p>
					</CardFooter>
				</Card>
				<Guidelines />
			</div>
		</div>
	);
};

export default SubmitLayout;
