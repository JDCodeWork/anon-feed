import { useState } from "react";
import { useNavigation } from "react-router";

import Autoplay from "embla-carousel-autoplay";
import { X } from "lucide-react";

import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@shared/components/ui";

type Screenshot = { url: string; name: string };
interface Props {
	screenshots: Screenshot[];
}
export const ImageSlider = ({ screenshots }: Props) => {
	const navigation = useNavigation();
	const [isMouseEnter, setIsMouseEnter] = useState(false);

	const isLoading = navigation.formAction?.includes(
		"intent=delete/img-preview",
	);
	const isDeleting = (imgName: string) =>
		navigation.formAction?.includes(`imgName=${imgName}`);

	if (screenshots.length > 0)
		return (
			<div className="relative rounded-lg overflow-hidden group/slider">
				<Carousel
					className="w-full  relative"
					plugins={[Autoplay({ delay: 3000, active: !isMouseEnter })]}
					onMouseEnter={() => setIsMouseEnter(true)}
					onMouseLeave={() => setIsMouseEnter(false)}
				>
					<CarouselContent>
						{screenshots.map(
							({ url, name }) =>
								!isDeleting(name) && (
									<CarouselItem
										key={url}
										className="group relative h-[280px] md:basis-1/2"
									>
										<img
											src={url}
											className="block size-full object-cover rounded-lg object-left select-none"
										/>
										<button
											type="submit"
											formAction={`/submit/media?intent=delete/img-preview&imgName=${name}`}
											name="imageName"
											disabled={isLoading}
											value={name}
											className="transition-opacity opacity-0 group-hover:opacity-85 hover:opacity-100 absolute top-4 right-4 bg-gray-50 cursor-pointer p-1 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
										>
											<X className="text-gray-800 size-5" />
										</button>
										{name.startsWith("preview") && (
											<span className="absolute bottom-2 left-2 transition-colors bg-gray-600/50 group-hover:bg-gray-800/75 text-gray-200 text-xs px-2 py-1 rounded select-none">
												preview
											</span>
										)}
									</CarouselItem>
								),
						)}
					</CarouselContent>
					<CarouselPrevious
						type="button"
						className="left-4 cursor-pointer disabled:cursor-default"
					/>
					<CarouselNext
						type="button"
						className="right-4 cursor-pointer disabled:cursor-default"
					/>
				</Carousel>

				<input
					type="hidden"
					name="screenshots"
					value={screenshots.map((s) => s.name).join(",")}
				/>
			</div>
		);
	else
		return (
			<div className="w-full h-[280px] bg-muted/50 dark:bg-muted/75 rounded-lg flex justify-center items-center">
				<p className="text-2xl text-muted-foreground/50 font-medium">
					Upload images to preview
				</p>
			</div>
		);
};
