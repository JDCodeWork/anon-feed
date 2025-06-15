import { Outlet } from "react-router";
import { Toaster } from "sonner";

import { Footer } from "@shared/components/Footer";
import { Header } from "@shared/components/Header";
import { useTheme } from "@shared/context/ThemeContext";

const AppLayout = () => {
	const { theme } = useTheme();

	return (
		<div className="flex flex-col min-h-screen">
			<Header />
			<main className="flex-1 flex flex-col">
				<Outlet />
			</main>
			<Footer />
			<Toaster richColors theme={theme} />
		</div>
	);
};

export default AppLayout;
