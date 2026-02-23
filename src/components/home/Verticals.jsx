"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = ({ onClick }) => (
  <button
    className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 bg-gray-300/70 text-black px-3 py-1 rounded-full"
    onClick={onClick}
  >
    ›
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 bg-gray-300/70 text-black px-3 py-1 rounded-full"
    onClick={onClick}
  >
    ‹
  </button>
);

const verticalsData = [
  {
    title: "SANITATION TECH",
    desc: "Our Sanitation Tech vertical is transforming the way confined spaces are cleaned — from manholes and sewer lines to stormwater drains, culverts, pipelines, and STP tanks. Using modern robotics, we eliminate hazards, boost efficiency, and ensure safer operations in the most challenging environments.",
    img: "/home/clean-tech.webp",
    gradient: "bg-gradient-to-b from-[#FCD901] to-[#ffffff00]",
    link: "https://sanitation.genrobotics.com/",
  },
  {
    title: "MEDICAL & MOBILITY",
    desc: "This division is revolutionizing physical medicine and rehabilitation with advanced technologies like robotic gait trainers and upper-body robotic rehabilitation systems, helping individuals regain mobility and independence.",
    img: "/home/medical-mobility.webp",
    gradient: "bg-gradient-to-t from-[#FCD901] to-[#ffffff00]",
    link: "https://medical.genrobotics.com/",
  },
  {
    title: "OIL & GAS",
    desc: "In this sector, we use robotic solutions for eliminating risks in the oil and gas industries, particularly for hazardous tasks such as confined space cleaning.",
    img: "/home/oil-gas.webp",
    gradient: "bg-gradient-to-b from-[#FCD901] to-[#ffffff00]",
    link: "",
  },
  {
    title: "ROBOTICS & AI RESEARCH",
    desc: "R&D is our advanced research hub, exploring future-ready technologies including bipedal walking, humanoid and semi-humanoid robotics, and other innovations shaping the next generation of robotics.",
    img: "/home/robotics.webp",
    gradient: "bg-gradient-to-t from-[#FCD901] to-[#ffffff00]",
    link: "http://research.genrobotics.com/",
  },
];

const Verticals = () => {
  const sliderRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (sliderRef.current) {
          if (entry.isIntersecting) {
            sliderRef.current.slickPlay();
          } else {
            sliderRef.current.slickPause();
          }
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const settings = {
    dots: true,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    cssEase: "linear",
    appendDots: (dots) => (
      <div>
        <ul className="flex justify-center items-center space-x-2 mt-4">
          {dots}
        </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 rounded-full bg-gray-500"></div>
    ),
  };

  return (
    <section
      ref={sectionRef}
      id="verticals"
      className="relative section py-8 xl:mb-12 pb-72 md:pb-0"
    >
      <div className="w-full md:w-xl lg:w-2xl xl:w-4xl mx-auto text-center space-y-4 md:mt-8">
        <h2 className="font-anton text-[#FCD901] text-2xl md:text-3xl lg:text-3xl">
          Our Ecosystem{" "}
          <span className="text-white block md:inline">
            A Hub of Innovation
          </span>
        </h2>
        <h4 className="text-white leading-relaxed">
          Genrobotics is more than a company; it's an ecosystem of specialized
          divisions, each tackling critical challenges in its respective
          industry
        </h4>
      </div>

      <style jsx global>{`
        /* Force height for all slides */
        .slick-slide .px-2.h-full {
          min-height: 561px !important; /* use min-height instead of height */
          height: 561px !important;
        }

        /* Optional: maintain proper flex layout inside the slide */
        .slick-slide .px-2.h-full > div {
          height: 100% !important;
        }
      `}</style>

      {/* Mobile carousel */}
      <div className="relative mt-12 xl:mt-32 container mx-auto md:hidden">
        <Slider ref={sliderRef} {...settings}>
          {verticalsData.map((vertical, index) => (
            <div key={index} className="px-2 h-full">
              <div className="relative rounded-xl h-full flex">
                <div
                  className={`relative rounded-xl p-[1px] ${vertical.gradient} w-full h-full flex`}
                  style={{ minHeight: 460 }}
                >
                  <div className="w-full bg-black rounded-xl p-2 flex flex-col h-full">
                    <div className="w-full aspect-4/3 relative">
                      <Image
                        src={vertical.img}
                        alt={vertical.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>

                    <div className="flex flex-col flex-grow justify-between mt-4 mx-2">
                      <div className="space-y-4">
                        <h5 className="text-[#FCD901] text-center uppercase">
                          {vertical.title}
                        </h5>
                        <h5 className="text-[#cacaca] leading-6 font-extralight text-justify">
                          {vertical.desc}
                        </h5>
                      </div>
                      <div className="flex justify-center">
                        {vertical.link ? (
                          <Link
                            href={vertical.link}
                            aria-label={`Learn more about ${vertical.title}`}
                            target="_blank"
                            className="bg-[#FCD901] justify-center px-4 py-2 text-xs my-4 inline-flex items-center rounded-sm w-fit"
                          >
                            Learn more <span className="ml-1">→</span>
                          </Link>
                        ) : (
                          <button
                            type="button"
                            className="bg-[#FCD901] justify-center px-4 py-2 text-xs my-4 inline-flex items-center rounded-sm cursor-pointer select-none w-fit"
                          >
                            Learn more <span className="ml-1">→</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-8 mt-12 xl:mt-24">
        {verticalsData.map((vertical, index) => (
          <div
            key={index}
            className="relative min-h-[36rem] 2xl:min-h-[40rem] rounded-xl"
          >
            <div
              className={`absolute inset-0 rounded-xl p-[0.5px] ${vertical.gradient}`}
            >
              <div className="h-full bg-black rounded-xl p-2 flex flex-col">
                <div className="w-full aspect-4/3 relative">
                  <Image
                    src={vertical.img}
                    alt={vertical.title}
                    fill
                    className="rounded-lg"
                  />
                </div>

                <div className="flex-grow flex flex-col justify-between mt-4 mx-2">
                  <div className="space-y-4">
                    <h5 className="text-[#FCD901] text-center uppercase">
                      {vertical.title}
                    </h5>
                    <h5 className="text-[#cacaca] leading-6 font-extralight text-justify">
                      {vertical.desc}
                    </h5>
                  </div>
                  {vertical.link ? (
                    <Link
                      href={vertical.link}
                      aria-label={`Learn more about ${vertical.title}`}
                      aria-describedby="new-window-learn-more"
                      className="bg-[#C5A341] justify-center px-4 py-2 text-xs my-4 inline-flex items-center rounded-sm w-fit mx-auto"
                    >
                      Learn more <span className="ml-1">→</span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="bg-[#C5A341] justify-center px-4 py-2 text-xs my-4 inline-flex items-center rounded-sm cursor-pointer select-none w-fit mx-auto"
                    >
                      Learn more <span className="ml-1">→</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Verticals;
