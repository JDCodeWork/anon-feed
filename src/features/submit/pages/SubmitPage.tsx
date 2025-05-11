import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@components/ui";
import { Link } from "react-router";
import { Guidelines } from "../components/Guidelines";
import { TabsForm } from "../components/tabs-form/TabsForm";

export const SubmitPage = () => {

	return (
		<div className="container py-8">
			<div className="max-w-3xl mx-auto">
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
		</div>
	);
};
