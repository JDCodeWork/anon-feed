import { Button } from "@shared/components/ui";
import { Heart, Share2 } from "lucide-react";

export const SocialButtons = () => {
	return (
		<>
			<div className="flex gap-2">
				<Button variant="outline" size="icon">
					<Heart className="h-4 w-4" />
					<span className="sr-only">Save</span>
				</Button>
				<Button variant="outline" size="icon">
					<Share2 className="h-4 w-4" />
					<span className="sr-only">Share</span>
				</Button>
			</div>
		</>
	);
};
