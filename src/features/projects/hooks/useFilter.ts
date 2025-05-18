import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";

const validFilters = ["all", "featured", "new"] as const;

export type FilterType = (typeof validFilters)[number];

export const useFilter = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [filter, setFilter] = useState("all");

	useEffect(() => {
		const searchFilter = searchParams.get("filter") ?? "all";

		if (!validFilters.includes(searchFilter as FilterType))
			setSearchParams({ filter: "all" });
		else if (searchFilter !== filter) setFilter(searchFilter);
	}, [searchParams]);

	const onChangeFilter = (filter: string) => {
		setSearchParams({ filter });
		setFilter(filter);
	};

	const handleFilterTab = () => {
		return {
			onValueChange: onChangeFilter,
			value: filter,
		};
	};

	return {
		handleFilterTab,
		filter: filter as FilterType,
	};
};
