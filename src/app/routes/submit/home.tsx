import { getAuth } from "@clerk/react-router/ssr.server";
import { Guidelines } from "@features/submit/components/Guidelines";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@shared/components/ui";
import { lazy } from "react";
import { Link, redirect } from "react-router";
import type { Route } from "./+types/home";

export const meta = () => [
	{
		title: "Submit | AnonFeed",
		description: "Submit your project to AnonFeed for feedback and visibility.",
	},
];

export async function loader(args: Route.LoaderArgs) {
	const { userId } = await getAuth(args);

	if (!userId) {
		return redirect("/");
	}
}

const TabsForm = lazy(
	() => import("@features/submit/components/tabs-form/TabsForm"),
);

const SubmitHomePage = () => {
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
						<TabsForm />
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

export default SubmitHomePage;
