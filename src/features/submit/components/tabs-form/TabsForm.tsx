import { useNavigate } from "react-router";
import { toast } from "sonner";

import { Tabs, TabsList, TabsTrigger } from "@components/ui";

import { type IProject, ProjectSchema } from "@features/projects";
import { FormProvider } from "@features/submit/context/FormContext";
import { useTabs } from "@features/submit/hooks/useTabs";

import { useSession } from "@clerk/clerk-react";
import { createProject } from "@features/submit/actions/create-project";
import { transformClerkUser } from "@shared/lib/transform-clerk-user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TabFeedback } from "./TabFeedback";
import { TabDetails } from "./tab-details/TabDetails";
import { TabMedia } from "./tab-media/TabMedia";

const TabsForm = () => {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const { handleTabs, handleNavigateTabs } = useTabs();

	const { session } = useSession();

	const createProjectMutation = useMutation({
		mutationFn: createProject,

		onSuccess: (result) => {
			queryClient.setQueryData(["project", result.id], result);
			queryClient.setQueryData(["project", "comments", result.id], []);

			navigate(`/project/${result.id}`);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const onSubmit = async (formData: IProject) => {
		if (!session?.user)
			return toast.error("you need to login to upload a project");

		const formattedUser = transformClerkUser(
			session.user,
			await session.getToken(),
		);

		createProjectMutation.mutate({
			projectData: formData,
			user: formattedUser!,
		});
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

export default TabsForm;
