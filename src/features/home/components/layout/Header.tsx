import { Button } from "@components/ui/button";
import { Code } from "lucide-react";
import { Link } from "react-router";

export const Header = () => (
	<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
		<div className="container flex h-16 items-center">
			<Link to="/" className="flex items-center gap-2 font-bold text-xl">
				<Code className="h-6 w-6" />
				<span>DevCritique</span>
			</Link>
			<nav className="ml-auto flex gap-4 sm:gap-6">
				<Link
					to="/projects"
					className="text-sm font-medium hover:underline underline-offset-4"
				>
					Projects
				</Link>
				<Link
					to="/submit"
					className="text-sm font-medium hover:underline underline-offset-4"
				>
					Submit
				</Link>
				<Link
					to="/about"
					className="text-sm font-medium hover:underline underline-offset-4"
				>
					About
				</Link>
			</nav>
			<div className="ml-4 flex items-center gap-2">
				<Link to="/signin">
					<Button variant="outline" size="sm">
						Sign In
					</Button>
				</Link>
				<Link to="/signup">
					<Button size="sm">Sign Up</Button>
				</Link>
			</div>
		</div>
	</header>
);
