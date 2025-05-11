import { Tabs, TabsList, TabsTrigger } from "@components/ui";
import type { ProjectForm } from "@features/submit/interfaces/project-feed-info.interface";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { TabDetails } from "./TabDetails";
import { TabFeedback } from "./TabFeedback";
import { TabMedia } from "./TabMedia";

const validTabs = ["details", "media", "feedback"] as const;
type Tabs = (typeof validTabs)[number];

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

type Params = { tab: Tabs };

export const TabsForm = () => {
	const navigate = useNavigate();
	const { tab } = useParams<Params>();

	if (!validTabs.includes(tab as Tabs)) {
		navigate("/submit/details");
	}

	const [activeTab, setActiveTab] = useState<Tabs>(tab!);
	const [form, setForm] = useState<ProjectForm>(defaultFormValues);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	useEffect(() => {
		if (tab != activeTab) navigate(`/submit/${activeTab}`);
	}, [activeTab]);

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
