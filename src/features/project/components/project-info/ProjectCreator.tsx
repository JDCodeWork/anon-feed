import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@shared/components/ui";
import { CheckCircle } from "lucide-react";

type Author = { name: string; verified: boolean };

interface Props {
	author: Author;
}
export const ProjectCreator = ({ author }: Props) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Project Creator</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col items-center gap-4 text-center">
					<Avatar className="h-20 w-20">
						<AvatarImage src={"/placeholder.svg"} alt={author.name} />
						<AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
					</Avatar>
					<div>
						<div className="flex items-center justify-center gap-1">
							<h3 className="font-semibold">{author.name}</h3>
							{author.verified && (
								<CheckCircle className="h-4 w-4 text-green-500" />
							)}
						</div>
						<p className="text-sm text-muted-foreground">
							Full Stack Developer
						</p>
					</div>
					<div className="flex gap-2">
						<Button variant="outline" size="sm">
							View Profile
						</Button>
						<Button size="sm">Contact</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
