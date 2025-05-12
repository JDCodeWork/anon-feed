import { Tabs, TabsList, TabsTrigger } from "@components/ui";

import { FormProvider } from "@features/submit/context/FormContext";
import { useTabs } from "@features/submit/hooks/useTabs";
import { TabFeedback } from "./TabFeedback";
import { TabMedia } from "./TabMedia";
import { TabDetails } from "./tab-details/TabDetails";

export const TabsForm = () => {
	const { handleTabs, handleNavigateTabs } = useTabs();

	return (
		<FormProvider onSubmit={(data) => console.log("data", data)}>
			<Tabs {...handleTabs()} className="w-full">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="details">Project Details</TabsTrigger>
					<TabsTrigger value="media">Media & Links</TabsTrigger>
					<TabsTrigger value="feedback">Feedback Goals</TabsTrigger>
				</TabsList>

				<TabDetails {...handleNavigateTabs({ current: "details" })} />
				<TabMedia {...handleNavigateTabs({ current: "media" })} />
				<TabFeedback {...handleNavigateTabs({ current: "feedback" })} />
			</Tabs>
		</FormProvider>
	);
};
