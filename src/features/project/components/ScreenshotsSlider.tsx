import { ChevronLeft, ChevronRight } from "lucide-react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
	screenshots: string[];
}
export const ScreenshotsSlider = ({ screenshots }: Props) => {
	return (
		<div className="relative rounded-lg overflow-hidden group/slider">
			{/* Custom buttons */}
			<button
				id="swiper-button-prev-custom"
				className="absolute size-12 top-1/2 left-4 z-20 -translate-y-3 transition-opacity opacity-25 group-hover/slider:opacity-50 hover:opacity-100 bg-gray-600/50 rounded-full pr-1 cursor-pointer"
			>
				<ChevronLeft className="text-gray-50 size-full" />
			</button>
			<button
				id="swiper-button-next-custom"
				className="absolute size-12 top-1/2 right-4 z-20 -translate-y-3 transition-opacity opacity-25 group-hover/slider:opacity-50 hover:opacity-100 bg-gray-600/50 rounded-full pl-0.5 cursor-pointer"
			>
				<ChevronRight className="text-gray-50 size-full" />
			</button>

			<Swiper
				modules={[Navigation, Pagination]}
				navigation={{
					prevEl: "#swiper-button-prev-custom",
					nextEl: "#swiper-button-next-custom",
				}}
				spaceBetween={25}
				slidesPerView={1}
				className="w-full h-[380px] relative"
			>
				{screenshots.map((url) => (
					<SwiperSlide key={url} className="flex group">
						<img
							src={url}
							className="block size-full object-cover rounded-lg object-left select-none"
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};
