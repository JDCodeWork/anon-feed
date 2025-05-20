import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@shared/components/ui";
import { Code, MessageSquare } from "lucide-react";

export const OverviewsSection = () => {
	return (
		<div className="grid gap-4 grid-cols-2">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Projects</CardTitle>
					<Code className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">4</div>
					<p className="text-xs text-muted-foreground">+1 from last month</p>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
					<MessageSquare className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">24</div>
					<p className="text-xs text-muted-foreground">+8 from last month</p>
				</CardContent>
			</Card>
		</div>
	);
};
