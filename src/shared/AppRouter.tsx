import { lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

import { AppLayout } from "./AppLayout";
import ErrorBoundary from "./ErrorBoundary";

const HomePage = lazy(() => import("@features/home/pages/HomePage"));
const ProjectDetailPage = lazy(
	() => import("@features/project/pages/ProjectDetailsPages"),
);
const ProjectListPage = lazy(
	() => import("@features/projects/pages/ProjectListPage"),
);
const SubmitPage = lazy(() => import("@features/submit/pages/SubmitPage"));

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<ErrorBoundary>
				<Routes>
					<Route path="/" element={<AppLayout />}>
						<Route index element={<HomePage />} />

						<Route path="projects" element={<ProjectListPage />} />
						<Route path="project/:id" element={<ProjectDetailPage />} />

						<Route path="submit">
							<Route index element={<Navigate to="details" />} />

							<Route path=":tab" element={<SubmitPage />} />
						</Route>

						<Route path="*" element={<Navigate to="/" replace />} />
					</Route>
				</Routes>
			</ErrorBoundary>
		</BrowserRouter>
	);
};
