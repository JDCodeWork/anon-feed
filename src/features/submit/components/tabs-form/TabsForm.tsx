import React, { useState } from "react";

import { Tabs, TabsList, TabsTrigger } from "@components/ui";
import { initialTabFormValues } from "@features/submit/constants/tab-form";

import { useTabs } from "@features/submit/hooks/useTabs";
import type { ProjectFormInputs } from "@features/submit/interfaces/project-feed-info";
import { TabFeedback } from "./TabFeedback";
import { TabMedia } from "./TabMedia";
import { TabDetails } from "./tab-details/TabDetails";

export const TabsForm = () => {
	const { handleTabs, handleNavigateTabs } = useTabs();
	const [form, setForm] = useState<ProjectFormInputs>(initialTabFormValues);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	return (
		<Tabs {...handleTabs()} className="w-full">
			<TabsList className="grid w-full grid-cols-3">
				<TabsTrigger value="details">Project Details</TabsTrigger>
				<TabsTrigger value="media">Media & Links</TabsTrigger>
				<TabsTrigger value="feedback">Feedback Goals</TabsTrigger>
			</TabsList>

			<TabDetails
				{...handleNavigateTabs({ current: "details" })}
				onChange={handleChange}
				formValues={form}
			/>
			<TabMedia {...handleNavigateTabs({ current: "media" })} />
			<TabFeedback
				{...handleNavigateTabs({ current: "feedback" })}
				onSubmit={() => alert("uploading project")}
			/>
		</Tabs>
	);
};
