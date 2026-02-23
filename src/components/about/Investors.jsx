"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-[#1b1b1b]/80 hover:bg-[#FCD901] w-12 h-12 flex items-center justify-center rounded-full shadow-md transition cursor-pointer"
    aria-label="previous"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white hover:text-black">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
    </svg>
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-[#1b1b1b]/80 hover:bg-[#FCD901] w-12 h-12 flex items-center justify-center rounded-full shadow-md transition cursor-pointer"
    aria-label="next"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white hover:text-black">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

const investorsData = [
  { image: "/about/investors/uiv-founder.webp", company: "UIV", logo: "/about/investors/uiv-logo.svg", name: "Bhaskar Majumdar", designation: "Founder and Managing Partner" },
  { image: "/about/investors/zoho-founder.webp", company: "zoho", logo: "/about/investors/zoho-logo.svg", name: "Sridhar Vembu", designation: "Chief Founder" },
  { image: "/about/investors/mahindra-founder.webp", company: "Mahindra", logo: "/about/investors/mahindra-logo.svg", name: "Anand Mahindra", designation: "Chairperson" },
  { image: "/about/investors/tally-founder.webp", company: "Tally", logo: "/about/investors/tally-logo.svg", name: "Nupur Goenka", designation: "Co-Founder" },
  { image: "/about/investors/edcite-founder.webp", company: "Edcite", logo: "/about/investors/edcite-logo.svg", name: "Tony G. Thomas", designation: "Co-Founder" },
  { image: "/about/investors/uiv-founder2.webp", company: "uiv", logo: "/about/investors/uiv-logo.svg", name: "Anil Joshy", designation: "Founder and Managing Partner" },
  { image: "/about/investors/seafund-founder.webp", company: "sea fund", logo: "/about/investors/seafund-logo.svg", name: "Manoj Kumar Agarwal", designation: "Founder and Managing Partner" },
  { image: "/about/investors/peakxv-founder.webp", company: "peakxv", logo: "/about/investors/peakxv-logo.svg", name: "Rajan Anand", designation: "Founder and Managing Partner" },
];

const Investors = () => {
  const [SlideToShow, setSlideToShow] = useState(1);

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: SlideToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    centerMode: SlideToShow === 1 ? false : true,
    centerPadding: "0px",
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
    appendDots: dots => (
      <div className="flex justify-center">
        <ul className="flex space-x-2 justify-center mt-8">{dots}</ul>
      </div>
    ),
    customPaging: i => <div className="w-3 h-3 rounded-full bg-gray-500 hover:bg-yellow-400 transition" />,
  };

  useEffect(() => {
    const updateSlides = () => {
      const width = window.innerWidth;

      switch (true) {
        case width < 640:
          setSlideToShow(1); // mobile
          break;

        case width >= 640 && width < 1024:
          setSlideToShow(2); // tablet
          break;

        case width >= 1025 && width < 1440:
          setSlideToShow(3); // tablet
          break;
        default:
          setSlideToShow(4); // desktop
          break;
      }
    };

    // Run on mount
    updateSlides();

    // Run on resize
    window.addEventListener("resize", updateSlides);

    // Cleanup
    return () => window.removeEventListener("resize", updateSlides);
  }, []);

  return (
    <section className="section py-4 relative bg-black">
      {/* Heading */}
      <div className="w-fit mx-auto space-y-4">
        <h2 className="font-anton text-white text-2xl md:text-3xl text-center mt-12">
          Our <span className="text-[#FCD901]">Investors</span>
        </h2>
        <div className="w-[70%] mx-auto h-[1px] bg-gradient-to-r from-black/0 via-white to-black"></div>
        <p className="text-white text-xl text-justify lg:text-center">
          We’re backed by partners who believe in innovation with purpose, and in creating
          lasting change together
        </p>
      </div>

      {/* Slick Carousel */}
      {/* note: overflow-hidden here prevents peek-of-next-slide when slidesToShow = 1 */}
      <div className="mt-10 overflow-hidden">
        <Slider {...settings}>
          {investorsData.map((investor, index) => (
            <div key={index} className="px-0"> {/* outer slide has no horizontal padding now */}
              <div className="mx-3 space-y-4 rounded-2xl overflow-hidden bg-[#E2E2E2]/20"> {/* spacing moved inside */}
                {/* Founder Image */}
                <div className="w-full aspect-square relative">
                  <Image
                    src={investor.image}
                    alt={`${investor.company} Founder`}
                    fill
                    priority
                    className=" rounded-t-2xl"
                  />
                </div>

                <div className="p-4 sm:px-6 sm:pb-6 space-y-3 sm:space-y-4">
                  <div className="text-center">
                    <p className="text-sm sm:text-base font-bold text-white">{investor.name}</p>
                    <p className="text-[10px] sm:text-xs text-white">{investor.designation}</p>
                  </div>
                  <div className="w-full h-16 sm:h-20 relative">
                    <Image
                      src={investor.logo}
                      alt={`${investor.company} Logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Investors;
