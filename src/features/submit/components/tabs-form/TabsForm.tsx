import { Tabs, TabsList, TabsTrigger } from "@components/ui";

import { FormProvider } from "@features/submit/context/FormContext";
import { useTabs } from "@features/submit/hooks/useTabs";
import {
	ProjectFeedSchema,
	type ProjectFeedType,
} from "@features/submit/schemas/project-feed-schema";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { TabFeedback } from "./TabFeedback";
import { TabDetails } from "./tab-details/TabDetails";
import { TabMedia } from "./tab-media/TabMedia";

export const TabsForm = () => {
	const navigate = useNavigate();
	const { handleTabs, handleNavigateTabs } = useTabs();

	const onSubmit = (data: ProjectFeedType) => {
		toast.success("Uploading project");

		navigate("/projects");
		console.log("data", data);
	};

	const onError = () => {
		toast.error("Some of the fields are incomplete or wrong");
	};

	return (
		<FormProvider
			onSubmit={onSubmit}
			onError={onError}
			validations={ProjectFeedSchema}
		>
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
