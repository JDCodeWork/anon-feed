export const ProjectCardSkeleton = () => {
	return (
		<div className="animate-pulse">
			<div className="bg-card border rounded-lg shadow-xs p-4 mb-4">
				<div className="flex justify-between items-start mb-4">
					<div>
						<div className="h-4 w-32 bg-card-foreground/15 rounded mb-2"></div>
						<div className="h-3 w-20 bg-card-foreground/5 rounded"></div>
					</div>
					<div className="h-6 w-16 bg-card-foreground/15 rounded"></div>
				</div>
				<div className="aspect-video bg-card-foreground/5 rounded-md mb-4"></div>
				<div className="h-3 w-full bg-card-foreground/5 rounded mb-4"></div>
				<div className="h-3 w-full bg-card-foreground/5 rounded mb-4"></div>
				<div className="h-3 w-full bg-card-foreground/5 rounded mb-4"></div>
				<div className="flex items-center justify-between w-full mb-4">
					<div className="flex items-center gap-2">
						<div className="size-8 bg-card-foreground/15 rounded-full"></div>
						<div className="h-4 w-32 bg-card-foreground/5 rounded"></div>
					</div>
					<div className="size-6 bg-card-foreground/5 rounded"></div>
				</div>
				<div className="h-10 w-full bg-card-foreground/5 rounded"></div>
			</div>
		</div>
	);
};
