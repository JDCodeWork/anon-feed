import { useSession } from "@clerk/clerk-react";
import { Button } from "@shared/components/ui";
import { Plus } from "lucide-react";
import { OverviewsSection } from "../components/OverviewsSection";
import { RecentTabs } from "../components/recent-tabs/RecentTabs";

export const DashboardPage = () => {
	const { isSignedIn, session } = useSession();

	if (isSignedIn)
		return (
			<div className="max-w-5xl w-full mx-auto my-8 flex flex-col gap-8">
				<div className="flex flex-col gap-6 relative">
					<div className="flex flex-col gap-2">
						<h1 className="text-3xl font-bold">Dashboard</h1>
						<p className="text-muted-foreground">
							Welcome back, {session.user.firstName}! Here's an overview of your
							projects.
						</p>
					</div>

					{/*TODO: <SearchBar /> */}

					<Button className="absolute top-4 right-0">
						<Plus />
						New Project
					</Button>
				</div>
				<OverviewsSection />
				<RecentTabs />
			</div>
		);
};
