import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@shared/components/ui";
import { Code, MessageSquare } from "lucide-react";
import { useEffect } from "react";
import { useUserData } from "../hooks/useUserData";

export const OverviewsSection = () => {
	const { comments, projects, refreshData } = useUserData();

	useEffect(() => {
		refreshData();
	}, []);

	return (
		<div className="grid gap-4 grid-cols-2">
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Projects</CardTitle>
					<Code className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{projects?.length || 0}</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<CardTitle className="text-sm font-medium">Total Feedback</CardTitle>
					<MessageSquare className="h-4 w-4 text-muted-foreground" />
				</CardHeader>
				<CardContent>
					<div className="text-2xl font-bold">{comments?.length || 0}</div>
				</CardContent>
			</Card>
		</div>
	);
};
