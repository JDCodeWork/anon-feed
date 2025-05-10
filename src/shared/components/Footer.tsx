import { Link } from "react-router";

export const Footer = () => (
	<footer className="w-full border-t py-6">
		<div className="mx-4 md:mx-6 lg:mx-8 xl:mx-12 flex flex-col items-center justify-between gap-4 md:flex-row">
			<p className="text-center text-sm text-muted-foreground md:text-left">
				&copy; {new Date().getFullYear()} AnonFeed Light. Some rights reserved.
			</p>
			<nav className="flex gap-4">
				<Link
					to="https://github.com/JDCodeWork/anon-feed"
					className="text-sm text-muted-foreground hover:underline underline-offset-4"
					target="_blank"
				>
					About
				</Link>
				<Link
					to="mailto:contacto@jdcode.work"
					target="_blank"
					className="text-sm text-muted-foreground hover:underline underline-offset-4"
				>
					Contact
				</Link>
			</nav>
		</div>
	</footer>
);
