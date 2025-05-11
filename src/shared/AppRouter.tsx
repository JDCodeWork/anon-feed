import { HomePage } from "@features/home";
import { ProjectListPage, ProjectPage } from "@features/projects";
import { SubmitPage } from "@features/submit";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { AppLayout } from "./AppLayout";

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route index element={<HomePage />} />

					<Route path="projects">
						<Route index element={<ProjectListPage />} />

						<Route path=":projectId" element={<ProjectPage />} />
					</Route>

					<Route path="submit">
						<Route index element={<Navigate to="details" />} />

						<Route path=":tab" element={<SubmitPage />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};
