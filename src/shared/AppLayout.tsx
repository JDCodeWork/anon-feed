import { Outlet } from "react-router";
import { Toaster } from "sonner";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";

export const AppLayout = () => {
	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-1">
				<Outlet />
			</main>
			<Footer />
			<Toaster richColors />
		</div>
	);
};
