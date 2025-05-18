import { useNavigate } from "react-router";
import { toast } from "sonner";

import { Tabs, TabsList, TabsTrigger } from "@components/ui";

import { type IProject, ProjectSchema } from "@features/projects";
import { FormProvider } from "@features/submit/context/FormContext";
import { useTabs } from "@features/submit/hooks/useTabs";

import { RedirectToSignIn, useSession } from "@clerk/clerk-react";
import { createProject } from "@features/submit/services/create-project";
import { transformClerkUser } from "@shared/lib/transform-clerk-user";
import { TabFeedback } from "./TabFeedback";
import { TabDetails } from "./tab-details/TabDetails";
import { TabMedia } from "./tab-media/TabMedia";

export const TabsForm = () => {
	const navigate = useNavigate();
	const { handleTabs, handleNavigateTabs } = useTabs();
	const { session, isSignedIn } = useSession();

	if (!isSignedIn) return <RedirectToSignIn />;

	const onSubmit = async (formData: IProject) => {
		const formattedUser = transformClerkUser(
			session.user,
			await session.getToken(),
		);

		const { data, error } = await createProject(formattedUser!, formData);

		if (!error) {
			toast.success(
				"The request for feedback on the project has been successfully completed",
			);
			navigate(`/project/${data?.id}`);
		}
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
