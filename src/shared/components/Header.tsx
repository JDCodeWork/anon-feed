import {
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
	UserButton,
} from "@clerk/clerk-react";
import { Button } from "@components/ui/button";
import { Code } from "lucide-react";
import { Link, NavLink } from "react-router";

export const Header = () => (
	<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
		<div className="mx-4 md:mx-6 lg:mx-8 xl:mx-12 flex justify-between h-16 items-center">
			<Link to="/" className="flex items-center gap-2 font-bold text-xl">
				<Code className="size-6 mt-1.5" />
				<span>
					AnonFeed <span className="text-muted-foreground">light</span>
				</span>
			</Link>
			<nav className="flex gap-4 sm:gap-6 ml-8 mr-auto">
				<NavLink
					to="/projects"
					className={({ isActive }) =>
						`text-sm ${isActive ? "font-semibold" : "font-medium"} hover:underline underline-offset-4`
					}
				>
					Projects
				</NavLink>
				<NavLink
					to="/submit"
					className={({ isActive }) =>
						`text-sm ${isActive ? "font-semibold" : "font-medium"} hover:underline underline-offset-4`
					}
				>
					Submit
				</NavLink>
			</nav>
			<div className="flex items-center gap-2">
				<SignedOut>
					<SignInButton mode="modal">
						<Button variant="secondary" className="cursor-pointer">
							Sign In
						</Button>
					</SignInButton>
					<SignUpButton mode="modal">
						<Button className="cursor-pointer">Sign Up</Button>
					</SignUpButton>
				</SignedOut>
				<SignedIn>
					<UserButton />
				</SignedIn>
			</div>
		</div>
	</header>
);
