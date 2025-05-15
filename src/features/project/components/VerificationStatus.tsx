import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@shared/components/ui";
import { CheckCircle } from "lucide-react";

export const VerificationStatus = () => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Verification Status</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div className="flex items-center gap-2">
						<CheckCircle className="h-5 w-5 text-green-500" />
						<div>
							<p className="font-medium">Identity Verified</p>
							<p className="text-xs text-muted-foreground">
								Creator has verified their identity
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<CheckCircle className="h-5 w-5 text-green-500" />
						<div>
							<p className="font-medium">GitHub Connected</p>
							<p className="text-xs text-muted-foreground">
								Project repository has been verified
							</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<CheckCircle className="h-5 w-5 text-green-500" />
						<div>
							<p className="font-medium">Live Demo Available</p>
							<p className="text-xs text-muted-foreground">
								Project has a working demo
							</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
