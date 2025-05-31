import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";

import { useFormContext } from "@features/submit/context/FormContext";
import { Navigation, Pagination } from "swiper/modules";

// @ts-ignore
import "swiper/css";

interface Props {
	screenshots: File[];
	onDelete: (name: string) => void;
}
export const ImageSlider = ({ onDelete, screenshots }: Props) => {
	if (screenshots.length > 0)
		return (
			<div className="relative rounded-lg overflow-hidden group/slider">
				{/* Custom buttons */}
				<button
					id="swiper-button-prev-custom"
					className="absolute size-12 top-1/2 left-4 z-20 -translate-y-3 transition-opacity opacity-25 group-hover/slider:opacity-50 hover:opacity-100 bg-gray-600 rounded-full pr-1 cursor-pointer"
				>
					<ChevronLeft className="text-gray-200 size-full" />
				</button>
				<button
					id="swiper-button-next-custom"
					className="absolute size-12 top-1/2 right-4 z-20 -translate-y-3 transition-opacity opacity-25 group-hover/slider:opacity-50 hover:opacity-100 bg-gray-600 rounded-full pl-0.5 cursor-pointer"
				>
					<ChevronRight className="text-gray-200 size-full" />
				</button>

				<Swiper
					modules={[Navigation, Pagination]}
					navigation={{
						prevEl: "#swiper-button-prev-custom",
						nextEl: "#swiper-button-next-custom",
					}}
					spaceBetween={25}
					slidesPerView={2}
					className="w-full h-[280px] relative"
				>
					{screenshots.map(({ name, preview }: any) => (
						<SwiperSlide key={name} className="flex group">
							<img
								src={preview}
								className="block size-full object-cover rounded-lg object-left select-none"
							/>
							<button
								className="transition-opacity opacity-0 group-hover:opacity-75 hover:opacity-100 absolute top-4 right-4 bg-gray-600 cursor-pointer p-1 rounded-full"
								onClick={() => onDelete(name)}
							>
								<X className="text-gray-100 size-6" />
							</button>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		);
	else
		return (
			<div className="w-full h-[280px] bg-gray-100 rounded-lg flex justify-center items-center">
				<p className="text-2xl text-gray-400 font-medium">
					Upload images to preview
				</p>
			</div>
		);
};
