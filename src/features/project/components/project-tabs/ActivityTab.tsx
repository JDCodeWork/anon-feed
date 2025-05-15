import { TabsContent } from "@shared/components/ui";
import { CheckCircle, Github, Heart, MessageSquare, Star } from "lucide-react";

const activities = [
	{
		icon: <MessageSquare className="h-4 w-4" />,
		description: "David Lee left feedback on this project",
		date: "2 days ago",
	},
	{
		icon: <Star className="h-4 w-4" />,
		description: "Project received a 5-star rating from Jennifer Park",
		date: "1 week ago",
	},
	{
		icon: <Heart className="h-4 w-4" />,
		description: "5 people saved this project",
		date: "1 week ago",
	},
	{
		icon: <CheckCircle className="h-4 w-4" />,
		description:
			"Project creator updated the description and added new screenshots",
		date: "2 weeks ago",
	},
	{
		icon: <Github className="h-4 w-4" />,
		description: "GitHub repository was connected and verified",
		date: "3 weeks ago",
	},
];

export const ActivityTab = () => {
	return (
		<TabsContent value="activity" className="mt-6">
			<div className="flex flex-col gap-6">
				<h2 className="text-xl font-semibold">Recent Activity</h2>
				<div className="space-y-4">
					{activities.map((activity, index) => (
						<div key={index} className="flex gap-4 items-start">
							<div className="rounded-full bg-muted p-2">{activity.icon}</div>
							<div className="flex flex-col gap-1">
								<p className="text-sm">{activity.description}</p>
								<p className="text-xs text-muted-foreground">{activity.date}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</TabsContent>
	);
};
