import { Tabs, TabsList, TabsTrigger } from "@components/ui";
import type { ProjectForm } from "@features/submit/interfaces/project-feed-info.interface";
import React, { useEffect, useState } from "react";
import { TabDetails } from "./TabDetails";
import { TabFeedback } from "./TabFeedback";
import { TabMedia } from "./TabMedia";

type Tabs = "details" | "media" | "feedback";

const defaultFormValues: ProjectForm = {
	category: "",
	description: "",
	experienceLevel: "",
	feedbackArea: "",
	githubRepo: "",
	image: "",
	liveDemo: "",
	screenshots: [],
	specificQuestions: "",
	tags: [""],
	title: "",
};

export const TabsForm = () => {
	const [activeTab, setActiveTab] = useState<Tabs>("details");
	const [form, setForm] = useState<ProjectForm>(defaultFormValues);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	useEffect(() => {
		console.log("form", form);
	}, [form]);

	return (
		<Tabs
			value={activeTab}
			onValueChange={(v) => setActiveTab(v as Tabs)}
			className="w-full"
		>
			<TabsList className="grid w-full grid-cols-3">
				<TabsTrigger value="details">Project Details</TabsTrigger>
				<TabsTrigger value="media">Media & Links</TabsTrigger>
				<TabsTrigger value="feedback">Feedback Goals</TabsTrigger>
			</TabsList>

			<TabDetails
				onNext={() => setActiveTab("media")}
				onChange={handleChange}
				formValues={form}
			/>
			<TabMedia
				onPrev={() => setActiveTab("details")}
				onNext={() => setActiveTab("feedback")}
			/>
			<TabFeedback
				onPrev={() => setActiveTab("media")}
				onSubmit={() => alert("uploading project")}
			/>
		</Tabs>
	);
};
