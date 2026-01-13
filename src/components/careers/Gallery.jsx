"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import Slider from "react-slick";

const galleryImages = Array.from({ length: 15 }, (_, i) => ({
  src: `/careers/gallery/life-${i + 1}.webp`,
  alt: `Career image ${i + 1}`,
}));

const GalleryCard = ({ item }) => (
  <div className="md:px-6 transform transition-transform duration-500">
    <div className="bg-[#1b1b1b] rounded-lg shadow-md overflow-hidden">
      <div className="relative w-full aspect-[4/3]">
        <Image src={item.src} alt={item.alt} fill className="object-cover" />
      </div>
    </div>
  </div>
);

const Gallery = () => {
  const sliderRef = useRef(null);

  const desktopSettings = {
    centerMode: true,
    slidesToShow: 3,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const mobileSettings = {
    slidesToShow: 1,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <section className="relative lifeAt_sec overflow-hidden section flex flex-col justify-center items-center">
      <div className="wrapper_ w-full max-w-[1400px] mx-auto text-center space-y-4">
        <h2 className="font-anton text-white text-2xl md:text-3xl lg:text-4xl">
          Life At <span className="text-[#FCD901]">Genrobotics</span>
        </h2>
        {/* <h4 className="text-white text-center">
          A glimpse into our world of innovation and camaraderie.
        </h4> */}
      </div>

      {/* Desktop carousel (unchanged) */}
      <div className="hidden lg:block relative w-full max-w-[1400px] mt-12 overflow-visible">
        <div className="pointer-events-none absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-black via-black/70 to-transparent z-20" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-black via-black/70 to-transparent z-20" />

        <Slider {...desktopSettings} ref={sliderRef}>
          {galleryImages.map((item, idx) => (
            <GalleryCard key={idx} item={item} />
          ))}
        </Slider>
      </div>

      {/* Mobile & tablet carousel (fixed to show one full card) */}
      <div className="block lg:hidden relative w-full mt-12 overflow-visible">
        <Slider {...mobileSettings} ref={sliderRef}>
          {galleryImages.map((item, idx) => (
            <GalleryCard key={idx} item={item} />
          ))}
        </Slider>
      </div>

      {/* Styling for desktop scaling, mobile adjustments */}
      <style jsx global>{`
        /* Active dot */
        .slick-dots li.slick-active div {
          background-color: #fcd901 !important;
        }

        /* Desktop card scaling (keep unchanged) */
        .slick-slide {
          transition: transform 0.5s;
        }

        .slick-center {
          transform: scale(1.15);
          z-index: 20;
        }

        /* Desktop padding (keep unchanged) */
        .slick-list {
          padding: 30px 50px !important;
        }

        /* Mobile adjustments: show one card, no scaling, no peek */
        @media (max-width: 1024px) {
          .slick-list {
            padding: 0 !important;
          }
          .slick-slide {
            transform: none !important;
          }
        }
      `}</style>

      <Link
        href="https://www.instagram.com/lifeatgenrobotics?igsh=bWxqbW45OTg1cmFi"
        className="px-4 py-2 bg-[#FCD901] rounded-lg w-fit mx-auto flex gap-1 mt-4"
      >
        Follow{" "}
        <Image
          src="/layout/socialmedia/instagram-dark.svg"
          alt="instagram"
          width={15}
          height={15}
        />{" "}
        Life at Genrobotics
      </Link>
    </section>
  );
};

export default Gallery;
