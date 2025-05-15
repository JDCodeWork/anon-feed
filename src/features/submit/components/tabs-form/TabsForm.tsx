import { useNavigate } from "react-router";
import { toast } from "sonner";

import { Tabs, TabsList, TabsTrigger } from "@components/ui";

import { type IProject, ProjectSchema } from "@features/projects";
import { FormProvider } from "@features/submit/context/FormContext";
import { useTabs } from "@features/submit/hooks/useTabs";

import { RedirectToSignIn, useUser } from "@clerk/clerk-react";
import { TabFeedback } from "./TabFeedback";
import { TabDetails } from "./tab-details/TabDetails";
import { TabMedia } from "./tab-media/TabMedia";

export const TabsForm = () => {
	const navigate = useNavigate();
	const { handleTabs, handleNavigateTabs } = useTabs();
	const { isSignedIn, user } = useUser();

	if (!isSignedIn) return <RedirectToSignIn />;

	const onSubmit = (data: IProject) => {
		toast.success("Uploading project");

		console.log("user", user);
		navigate("/projects");
	};

	const onError = () => {
		toast.error("Some of the fields are incomplete or wrong");
	};

	return (
		<FormProvider
			onSubmit={onSubmit}
			onError={onError}
			validations={ProjectSchema}
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
