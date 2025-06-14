import { CATEGORIES } from "@features/submit/constants/project-creation.constant";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
	Badge,
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@shared/components/ui";
import { useQueryClient } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router";
import type { IProjectResponse } from "../interfaces/project.interface";

interface Props {
	project: IProjectResponse;
}
export const ProjectCard = ({ project }: Props) => {
	const queryClient = useQueryClient();

	const handlePrefetch = async () =>
		await queryClient.prefetchQuery({
			queryKey: ["project", project.id],
		});

	const formattedDescription =
		project.description.length > 124
			? `${project.description.slice(0, 124)}...`
			: project.description;

	return (
		<Card className="shadow-xs">
			<CardHeader className="pt-2 px-6">
				<div className="flex justify-between items-start">
					<div className="space-y-2">
						<CardTitle>{project.title}</CardTitle>
						<CardDescription className="text-start">
							{CATEGORIES.find((c) => c.value == project.category)?.label ||
								project.category}
						</CardDescription>
					</div>
					<Badge variant={project.featured ? "default" : "outline"}>
						{project.featured ? "Featured" : "New"}
					</Badge>
				</div>
			</CardHeader>
			<CardContent className="pb-2 px-4 pt-0 flex-1">
				<div className="aspect-video overflow-hidden rounded-md bg-muted mb-4">
					<img
						src={project.screenshots[0]}
						alt={project.title}
						className="object-cover w-full h-full"
					/>
				</div>
				<p className="px-1 text-sm text-start">{formattedDescription}</p>
			</CardContent>
			<CardFooter className="py-2 px-4 flex flex-col gap-4">
				<div className="flex items-center justify-between w-full">
					<div className="flex items-center gap-2">
						<Avatar className="size-6">
							<AvatarImage
								src={project.author.image || ""}
								alt={project.author.name}
							/>
							<AvatarFallback>{project.author.name.charAt(0)}</AvatarFallback>
						</Avatar>
						<span className="text-sm font-medium">{project.author.name}</span>
					</div>
					{project.author.id.startsWith("user_") ? (
						<CheckCircle className="h-4 w-4 text-green-500" />
					) : (
						""
					)}
				</div>
				<div className="flex items-center justify-between w-full text-sm text-muted-foreground">
					{/* 				<div className="flex items-center gap-1">
					<MessageSquare className="h-4 w-4" />
					<span>{project.commentCount}</span>
				</div> */}
					{/* <div className="flex items-center gap-1">
					<Star className="h-4 w-4" />
					<span>{project.rating.toFixed(1)}</span>
				</div>
				<div className="flex items-center gap-1">
					<TrendingUp className="h-4 w-4" />
					<span>{project.views}</span>
				</div> */}
				</div>
				<Link
					to={`/project/${project.id}`}
					className="w-full"
					onMouseEnter={handlePrefetch}
				>
					<Button variant="outline" className="w-full cursor-pointer">
						View Project
					</Button>
				</Link>
			</CardFooter>
		</Card>
	);
};
