import { useTheme } from "@shared/context/ThemeContext";
import { MoonIcon, SunIcon } from "lucide-react";
import { Button } from "./ui";

export const ThemeToggleBtn = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<Button variant="outline" size="icon" onClick={toggleTheme}>
			{theme === "dark" ? (
				<SunIcon className="h-4 w-4" />
			) : (
				<MoonIcon className="h-4 w-4" />
			)}
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
};
