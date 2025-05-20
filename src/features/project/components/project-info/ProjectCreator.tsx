import { EXPERIENCE_LEVEL } from "@features/submit/constants/project-creation.constant";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "@shared/components/ui";
import type { ISupabaseUser } from "@shared/interfaces";

interface Props {
	author: ISupabaseUser;
	experience: string;
}
export const ProjectCreator = ({ author, experience }: Props) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Project Creator</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex flex-col items-center gap-4 text-center">
					<Avatar className="h-20 w-20">
						<AvatarImage src={author.image || ""} alt={author.name} />
						<AvatarFallback className="text-4xl">
							{author.name.charAt(0)}
						</AvatarFallback>
					</Avatar>
					<div>
						<div className="flex items-center justify-center gap-1">
							<h3 className="font-semibold">{author.name}</h3>
						</div>
						<p className="text-sm text-muted-foreground">
							{EXPERIENCE_LEVEL.find((e) => e.value == experience)?.label ||
								experience}{" "}
							developer
						</p>
					</div>
					{/* <div className="flex gap-2">
						<Button variant="outline" size="sm">
							View Profile
						</Button>
						<Button size="sm">Contact</Button>
					</div> */}
				</div>
			</CardContent>
		</Card>
	);
};
