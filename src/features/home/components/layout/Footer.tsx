import { Link } from "react-router";

export const Footer = () => (
	<footer className="w-full border-t py-6">
		<div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
			<p className="text-center text-sm text-muted-foreground md:text-left">
				&copy; {new Date().getFullYear()} DevCritique. All rights reserved.
			</p>
			<nav className="flex gap-4">
				<Link
					to="/terms"
					className="text-sm text-muted-foreground hover:underline underline-offset-4"
				>
					Terms
				</Link>
				<Link
					to="/privacy"
					className="text-sm text-muted-foreground hover:underline underline-offset-4"
				>
					Privacy
				</Link>
				<Link
					to="/contact"
					className="text-sm text-muted-foreground hover:underline underline-offset-4"
				>
					Contact
				</Link>
			</nav>
		</div>
	</footer>
);
