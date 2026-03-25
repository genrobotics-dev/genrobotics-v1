"use client"
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const CustomSlider = ({
    items,
    renderItem,
    swiperConfig = {},
    showProgress = true,
    showNavigation = true,
    onSwiper = null
}) => {
    const progressRef = useRef(null);
    const [prevEl, setPrevEl] = useState(null);
    const [nextEl, setNextEl] = useState(null);

    const onAutoplayTimeLeft = (s, time, progress) => {
        if (progressRef.current) {
            progressRef.current.style.width = `${(1 - progress) * 100}%`;
        }
    };

    const defaultConfig = {
        modules: [Navigation, Autoplay],
        spaceBetween: 10,
        slidesPerView: 1,
        centeredSlides: true,
        loop: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: true,
        },
        breakpoints: {
            640: {
                slidesPerView: 2.2,
                spaceBetween: 20,
                centeredSlides: true,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
                centeredSlides: true,
            }
        }
    };

    const config = { ...defaultConfig, ...swiperConfig };

    return (
        <div className="w-full">
            <Swiper
                {...config}
                onSwiper={onSwiper}
                onAutoplayTimeLeft={onAutoplayTimeLeft}
                navigation={{
                    prevEl,
                    nextEl,
                }}
                className="w-full h-full [&_.swiper-wrapper]:flex [&_.swiper-slide]:!h-auto [&_.swiper-slide]:flex [&_.swiper-slide>div]:w-full [&_.swiper-slide>div]:h-full [&_.swiper-slide>a]:w-full [&_.swiper-slide>a]:h-full"
            >
                {items.map((item, index) => (
                    <SwiperSlide key={index}>
                        {renderItem(item, index)}
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="flex justify-between items-center mt-6">
                {showProgress && (
                    <div className="w-32 h-[2px] bg-white/20 rounded-[2px] overflow-hidden">
                        <div className="h-full bg-[#fcd901] w-0 transition-[width] duration-100 ease-linear" ref={progressRef}></div>
                    </div>
                )}
                {showNavigation && (
                    <div className="flex gap-4 ml-auto">
                        <button ref={(node) => setPrevEl(node)} className="text-[1.2rem] cursor-pointer hover:text-[#fcd901] flex items-center justify-center transition-all duration-300 ease-in-out" aria-label="Previous slide">
                            ←
                        </button>
                        <button ref={(node) => setNextEl(node)} className="text-[1.2rem] cursor-pointer hover:text-[#fcd901] flex items-center justify-center transition-all duration-300 ease-in-out" aria-label="Next slide">
                            →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomSlider;