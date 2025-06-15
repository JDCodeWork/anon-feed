import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@shared/components/ui";
import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";

interface Props {
	screenshots: string[];
}
export const ScreenshotsSlider = ({ screenshots }: Props) => {
	const [isMouseEnter, setIsMouseEnter] = useState(false);

	return (
		<div className="relative rounded-lg overflow-hidden group/slider">
			<Carousel
				className="w-full  relative"
				plugins={[Autoplay({ delay: 3000, active: !isMouseEnter })]}
				onMouseEnter={() => setIsMouseEnter(true)}
				onMouseLeave={() => setIsMouseEnter(false)}
			>
				<CarouselContent>
					{screenshots.map((url) => (
						<CarouselItem key={url} className="group relative h-[380px]">
							<img
								src={url}
								className="block size-full object-cover rounded-lg object-left select-none"
							/>
						</CarouselItem>
					))}
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
		</div>
	);
};
