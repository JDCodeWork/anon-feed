import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { HomePage } from "@features/home";
import { ProjectDetailPage } from "@features/project";
import { ProjectListPage } from "@features/projects";
import { SubmitPage } from "@features/submit";

import { AppLayout } from "./AppLayout";

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route index element={<HomePage />} />

					<Route path="projects" element={<ProjectListPage />} />
					<Route path="project/:id" element={<ProjectDetailPage />} />

					<Route path="submit">
						<Route index element={<Navigate to="details" />} />

						<Route path=":tab" element={<SubmitPage />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
