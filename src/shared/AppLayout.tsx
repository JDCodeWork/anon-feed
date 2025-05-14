import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import { Toaster } from "@components/ui/sonner";
import { Outlet } from "react-router";

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
