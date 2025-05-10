import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@components/ui/card";
import { CheckCircle, MessageSquare, Star, TrendingUp } from "lucide-react";
import { Link } from "react-router";

type Project = {
	id: string;
	title: string;
	category: string;
	description: string;
	image: string;
	featured: boolean;
	author: {
		name: string;
		avatar: string;
		verified: boolean;
	};
	commentCount: number;
	rating: number;
	views: number;
};

export const ProjectCard = ({ project }: { project: Project }) => (
	<Card className="overflow-hidden">
		<CardHeader className="p-4">
			<div className="flex justify-between items-start">
				<div>
					<CardTitle className="line-clamp-1">{project.title}</CardTitle>
					<CardDescription className="line-clamp-1">
						{project.category}
					</CardDescription>
				</div>
				<Badge variant={project.featured ? "default" : "outline"}>
					{project.featured ? "Featured" : "New"}
				</Badge>
			</div>
		</CardHeader>
		<CardContent className="p-4 pt-0">
			<div className="aspect-video overflow-hidden rounded-md bg-muted mb-4">
				<img
					src={project.image || "/placeholder.svg"}
					alt={project.title}
					className="object-cover w-full h-full"
				/>
			</div>
			<p className="text-sm line-clamp-2">{project.description}</p>
		</CardContent>
		<CardFooter className="p-4 flex flex-col gap-4">
			<div className="flex items-center justify-between w-full">
				<div className="flex items-center gap-2">
					<Avatar className="h-6 w-6">
						<AvatarImage
							src={project.author.avatar || "/placeholder.svg"}
							alt={project.author.name}
						/>
						<AvatarFallback>{project.author.name.charAt(0)}</AvatarFallback>
					</Avatar>
					<span className="text-sm font-medium">{project.author.name}</span>
				</div>
				{project.author.verified && (
					<CheckCircle className="h-4 w-4 text-green-500" />
				)}
			</div>
			<div className="flex items-center justify-between w-full text-sm text-muted-foreground">
				<div className="flex items-center gap-1">
					<MessageSquare className="h-4 w-4" />
					<span>{project.commentCount}</span>
				</div>
				<div className="flex items-center gap-1">
					<Star className="h-4 w-4" />
					<span>{project.rating.toFixed(1)}</span>
				</div>
				<div className="flex items-center gap-1">
					<TrendingUp className="h-4 w-4" />
					<span>{project.views}</span>
				</div>
			</div>
			<Link to={`/projects/${project.id}`} className="w-full">
				<Button variant="outline" className="w-full">
					View Project
				</Button>
			</Link>
		</CardFooter>
	</Card>
);
