import { useSession } from "@clerk/react-router";
import { OverviewsSection } from "@features/dashboard/components/OverviewsSection";
import { RecentTabs } from "@features/dashboard/components/recent-tabs/RecentTabs";
import { useUserData } from "@features/dashboard/hooks/useUserData";
import { Button } from "@shared/components/ui";
import { Plus, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import type { Route } from "./+types/dashboard";

export const meta: Route.MetaFunction = () => [
	{ title: "Dashboard - AnonFeed" },
];

const DashboardPage = () => {
	const navigate = useNavigate();
	const { isSignedIn, session } = useSession();
	const { refreshData } = useUserData();

	const [isRefreshing, setIsRefreshing] = useState(false);

	useEffect(() => {
		if (!isSignedIn) navigate("/");
	}, [isSignedIn]);

	const handleRefresh = () => {
		setIsRefreshing(true);
		refreshData();

		setTimeout(() => {
			setIsRefreshing(false);
		}, 500);
	};

	return (
		<div className="max-w-5xl w-full mx-auto my-8 flex flex-col gap-8">
			<div className="flex justify-between items-center relative">
				<div className="flex flex-col gap-2">
					<h1 className="text-3xl font-bold">Dashboard</h1>
					<p className="text-muted-foreground">
						Welcome back, {session?.user.firstName}! Here's an overview of your
						projects.
					</p>
				</div>

				{/*TODO: <SearchBar /> */}

				<div className="flex gap-6">
					<Link to="/submit">
						<Button>
							<Plus />
							New Project
						</Button>
					</Link>
					<Button
						variant="outline"
						size="icon"
						disabled={isRefreshing}
						onClick={handleRefresh}
					>
						<RefreshCcw className={isRefreshing ? "animate-spin" : ""} />
					</Button>
				</div>
			</div>
			<OverviewsSection />
			<RecentTabs />
		</div>
	);
};

export default DashboardPage;
