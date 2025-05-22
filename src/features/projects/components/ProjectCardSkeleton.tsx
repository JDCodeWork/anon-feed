export const ProjectCardSkeleton = () => {
	return (
		<div className="animate-pulse">
			<div className="bg-white border rounded-lg shadow-xs p-4 mb-4">
				<div className="flex justify-between items-start mb-4">
					<div>
						<div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
						<div className="h-3 w-20 bg-gray-100 rounded"></div>
					</div>
					<div className="h-6 w-16 bg-gray-200 rounded"></div>
				</div>
				<div className="aspect-video bg-gray-100 rounded-md mb-4"></div>
				<div className="h-3 w-full bg-gray-100 rounded mb-4"></div>
				<div className="flex items-center justify-between w-full mb-4">
					<div className="flex items-center gap-2">
						<div className="h-6 w-6 bg-gray-200 rounded-full"></div>
						<div className="h-3 w-16 bg-gray-100 rounded"></div>
					</div>
					<div className="h-4 w-4 bg-gray-100 rounded"></div>
				</div>
				<div className="h-10 w-full bg-gray-100 rounded"></div>
			</div>
		</div>
	);
};
