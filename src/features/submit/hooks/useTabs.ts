import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { validTabs } from "../constants/tab-form";

export type TabType = (typeof validTabs)[number];

type Params = { tab: TabType };

export const useTabs = () => {
	const navigate = useNavigate();
	const { tab } = useParams<Params>();

	if (!validTabs.includes(tab as TabType)) {
		navigate("/submit/details");
	}

	const [activeTab, setActiveTab] = useState<TabType>(tab!);

	useEffect(() => {
		if (tab != activeTab) navigate(`/submit/${activeTab}`);
	}, [activeTab]);

	const handleNavigateTabs = ({ current }: { current: TabType }) => {
		return {
			onNext: () => navigateTab(current, 1),
			onPrev: () => navigateTab(current, -1),
		};
	};
	const handleTabs = () => ({
		onValueChange: (v: string) => setActiveTab(v as TabType),
		value: activeTab,
	});

	const navigateTab = (current: TabType, direction: number) => {
		const idxTab = validTabs.indexOf(current);

		if (idxTab + direction >= validTabs.length || idxTab + direction < 0) {
			throw new Error("useTabs: direction not valid");
		}

		setActiveTab(validTabs[idxTab + direction]);
	};

	return {
		activeTab,
		handleTabs,
		handleNavigateTabs,
	};
};
