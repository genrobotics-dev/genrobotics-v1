"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 🎖️ Awards Data
const cards = [
  {
    id: 1,
    title: "Bandicoot 2.0 Launched in the presence of the Prime Minister",
    desc: "Officially launched by Hon'ble Prime Minister Shri Narendra Modi, marking a milestone in robotic sanitation.",
    img: "/home/awards/award1.webp",
  },
  {
    id: 2,
    title: "Swachhata Startup Challenge",
    desc: "Recognized for pioneering achievements in robotics automation.",
    img: "/home/awards/award2.webp",
  },
  {
    id: 3,
    title: "Ranked as Top3 AI Startup of India",
    desc: "Celebrating our transformative impact on global urban sanitation.",
    img: "/home/awards/award3.webp",
  },
  {
    id: 4,
    title: "The Hindu BusinessLine Young Changemaker Award",
    desc: "For inventing Bandicoot, the world’s first robotic scavenger.",
    img: "/home/awards/award4.webp",
  },
  {
    id: 5,
    title: "Infosys Aarohan Social Innovation Award",
    desc: "For the revolutionary Bandicoot robot, eliminating manual scavenging.",
    img: "/home/awards/award5.webp",
  },
  {
    id: 6,
    title: "AMRUT Tech Challenge Award",
    desc: "Recognized for Bandicoot’s innovative solution in sewer cleaning safety.",
    img: "/home/awards/award6.webp",
  },
  {
    id: 7,
    title: "BIRAC High Social Impact Innovation Award",
    desc: "For Bandicoot & Bandicoot Mobility+ improving worker safety and sanitation.",
    img: "/home/awards/award7.webp",
  },
  {
    id: 8,
    title: "National Startup Award The Best Campus-Initiated Startups",
    desc: "For Bandicoot, the world’s first manhole-cleaning robot.",
    img: "/home/awards/award8.webp",
  },
  {
    id: 9,
    title: "Forbes 30 Under 30 Asia Recognition",
    desc: "For Bandicoot, transforming sanitation practices in India.",
    img: "/home/awards/award9.webp",
  },
  {
    id: 10,
    title: "Economic Times Social Enterprise Award",
    desc: "For Bandicoot, advancing safety and efficiency in sanitation.",
    img: "/home/awards/award10.webp",
  },
  {
    id: 11,
    title: "Recognized as the “Pride of Kerala” by the Government of Kerala",
    desc: "Recognized by Kerala Startup Mission for Bandicoot’s impact.",
    img: "/home/awards/award11.webp",
  },
  {
    id: 12,
    title: "Level Next Award – India Scale-Up Program",
    desc: "For demonstrating scalable, impactful innovation in robotics.",
    img: "/home/awards/award12.webp",
  },
  {
    id: 13,
    title: "ISC FICCI Best Corporate Initiative Award",
    desc: "For Bandicoot’s innovative approach to improving urban hygiene.",
    img: "/home/awards/award13.webp",
  },
  {
    id: 14,
    title: "Honored with the Asia Inspiration Award from International Youth Committee",
    desc: "For Bandicoot, providing a sustainable alternative to manual scavenging.",
    img: "/home/awards/award14.webp",
  },
  {
    id: 15,
    title: "Anjani Mashelkar Inclusive Innovation Award",
    desc: "For Bandicoot, pioneering robotics solutions with high social impact.",
    img: "/home/awards/award15.webp",
  },
];

// ⬅️ Prev Arrow
const PrevArrow = ({ onClick, ariaLabel = "Previous slide" }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel}
    className="absolute top-1/2 left-4 -translate-y-1/2 z-30 bg-white/60 hover:bg-[#FCD901]
               w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full
               shadow-md transition cursor-pointer focus:outline-none focus:ring-2 pointer-events-auto"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-6 h-6 text-black"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M15 19l-7-7 7-7"
      />
    </svg>
  </button>
);

const NextArrow = ({ onClick, ariaLabel = "Next slide" }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={ariaLabel}
    className="absolute top-1/2 right-4 -translate-y-1/2 z-30 bg-white/60 hover:bg-[#FCD901]
               w-8 h-8 md:w-12 md:h-12 flex items-center justify-center rounded-full
               shadow-md transition cursor-pointer focus:outline-none focus:ring-2 pointer-events-auto"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      className="w-6 h-6 text-black"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 5l7 7-7 7"
      />
    </svg>
  </button>
);

// 🧱 Slide Card
const CarouselCard = ({ card }) => (
  <div className="px-3">
    <div className="bg-[#1b1b1b] rounded-lg shadow-md p-2 md:p-6">
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-md">
        <Image src={card.img} alt={card.title} fill className="object-cover" />
      </div>
      <div className="pt-4 text-center">
        <h5 className="text-lg font-semibold text-white">{card.title}</h5>
      </div>
    </div>
  </div>
);

// 🏆 Main Awards Component
const Awards = () => {
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);
  const [arrowPosition, setArrowPosition] = useState(300);

  const desktopSettings = {
    centerMode: true,
    slidesToShow: 1,
    centerPadding: "260px",
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    dots: true,
    appendDots: (dots) => (
      <div className="flex justify-center">
        <ul className="flex space-x-2 justify-center mt-8">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 h-3 rounded-full bg-gray-500 hover:bg-yellow-400 transition" />
    ),
    responsive: [
      { breakpoint: 1400, settings: { centerPadding: "200px" } },
      { breakpoint: 1200, settings: { centerPadding: "180px" } },
      { breakpoint: 1024, settings: { centerPadding: "120px" } },
      { breakpoint: 2000, settings: { centerPadding: "320px" } },
      { breakpoint: 2500, settings: { centerPadding: "380px" } },
      { breakpoint: 3000, settings: { centerPadding: "460px" } },
    ],
  };

  // Mobile carousel
  const mobileSettings = {
    centerMode: false,
    slidesToShow: 1,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: false,
  };

  return (
    <section className="section my-24 md:my-48 flex flex-col justify-center items-center">
      {/* Heading */}
      <div className="w-full mx-auto text-center space-y-4">
        <h2 className="font-anton text-[#FCD901] text-2xl md:text-3xl lg:text-4xl">
          Awards & Recognition
        </h2>
      </div>

      {/* 🖥 Desktop Carousel */}
      <div className="hidden lg:block relative w-full mt-12 overflow-visible">
        {/* Side Gradients */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-32 bg-gradient-to-r from-black via-black/70 to-transparent z-20" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-black via-black/70 to-transparent z-20" />

        {/* Dynamic Arrows beside center image */}
        <PrevArrow
          onClick={() => desktopRef.current?.slickPrev()}
          position={arrowPosition}
          mobile={false}
        />
        <NextArrow
          onClick={() => desktopRef.current?.slickNext()}
          position={arrowPosition}
          mobile={false}
        />

        <Slider {...desktopSettings} ref={desktopRef}>
          {cards.map((card) => (
            <CarouselCard key={card.id} card={card} />
          ))}
        </Slider>
      </div>

      {/* 📱 Mobile Carousel */}
      <div className="block lg:hidden relative w-full mt-12 overflow-visible">
        <PrevArrow
          onClick={() => mobileRef.current?.slickPrev()}
          mobile={true}
        />
        <NextArrow
          onClick={() => mobileRef.current?.slickNext()}
          mobile={true}
        />

        <Slider {...mobileSettings} ref={mobileRef}>
          {cards.map((card) => (
            <CarouselCard key={card.id} card={card} />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Awards;
