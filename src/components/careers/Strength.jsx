"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

const Strength = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const itemRefs = useRef([]);

  const dataReasons = [
    {
      icon: "/careers/reason1.svg",
      title: "Pioneering Technology",
      desc: "Work at the forefront of robotics, AI, and IoT. Develop solutions that solve critical real-world problems and push the boundaries of technology.",
    },
    {
      icon: "/careers/reason2.svg",
      title: "Meaningful Social Impact",
      desc: "Contribute to our mission of eliminating manual scavenging and creating safer working conditions. Your work directly saves lives and restores human dignity.",
    },
    {
      icon: "/careers/reason3.svg",
      title: "Exceptional Growth",
      desc: "We believe in nurturing talent. Benefit from a collaborative environment, continuous learning opportunities, and a clear path for career progression.",
    },
  ];

  const cultureData = [
    {
      image: "/careers/innovation-driven.webp",
      title: "Innovation-driven",
      desc: "We encourage curiosity and experimentation to find the best solutions.",
    },
    {
      image: "/careers/purpose-led.webp",
      title: "Purpose-led",
      desc: "We encourage curiosity and experimentation to find the best solutions.",
    },
    {
      image: "/careers/collaborative-spirit.webp",
      title: "Collaborative Spirit",
      desc: "We encourage curiosity and experimentation to find the best solutions.",
    },
    {
      image: "/careers/ownership-accountability.webp",
      title: "Ownership & Accountability",
      desc: "We encourage curiosity and experimentation to find the best solutions.",
    },
  ];

  // Intersection Observer for active item
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0)
          setActiveIndex(Number(visible[0].target.dataset.index));
      },
      {
        root: scrollContainerRef.current,
        threshold: Array.from({ length: 101 }, (_, i) => i / 100),
      }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => itemRefs.current.forEach((el) => el && observer.unobserve(el));
  }, []);

  return (
    <section className="relative section space-y-12 lg:space-y-24 xl:space-y-36">
      {/* Top Reasons */}
      <div className="w-full flex">
        <div className="w-full">
          {/* Mobile view */}
          <div className="md:hidden space-y-6 hide-scrollbar px-4 gap-8">
            {dataReasons.map((item, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 space-y-4 p-4 bg-[#121212] rounded-xl"
              >
                <div className="relative w-24 h-24 mx-auto">
                  <Image src={item.icon} alt={item.title} fill />
                </div>
                <h4 className="text-[#FCD901] text-center">{item.title}</h4>
                <p className="text-base text-white text-justify">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Desktop view */}
          <div className="hidden md:flex items-start">
            {dataReasons.map((item, idx) => (
              <React.Fragment key={idx}>
                <div className="md:flex-1 space-y-4 p-4">
                  <div className="relative w-24 h-24 mx-auto">
                    <Image src={item.icon} alt={item.title} fill />
                  </div>
                  <h4 className="text-[#FCD901] text-center">{item.title}</h4>
                  <p className="text-base text-white text-justify">
                    {item.desc}
                  </p>
                </div>
                {idx < dataReasons.length - 1 && (
                  <div className="w-px h-72 bg-gradient-to-b from-black/0 via-[#FCD901] to-black/0 mx-2"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Culture Section */}
      <div className="flex gap-4">
        {/* Titles (Desktop) */}
        <div className="hidden md:flex flex-5 h-[600px]">
          <div className="flex items-center justify-center h-full">
            <ul className="list-none space-y-8">
              {cultureData.map((item, i) => (
                <li
                  key={i}
                  className={`font-anton text-2xl 2xl:text-4xl tracking-wide transition-colors duration-300 ${activeIndex === i ? "text-[#FCD901]" : "text-white"
                    }`}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Scrollable Images */}
        <div className="md:flex-7">
          <div className="mb-8">
            <h2 className="font-anton text-white">
              Our Culture is{" "}
              <span className="text-[#FCD901]">Our Strength</span>
            </h2>
            <h4 className="text-white">Navigating Hazards and Regulations</h4>
            <h5 className="text-white my-4">
              We foster a culture rooted in innovation, collaboration, and
              purpose. Our diverse team of thinkers, creators, and problem
              solvers is united by a shared mission.
            </h5>
          </div>

          {/* Active title mobile */}
          <div className="md:hidden mb-4">
            <p className="text-[#FCD901] font-anton text-2xl tracking-wide">
              {cultureData[activeIndex].title}
            </p>
          </div>

          <div
            ref={scrollContainerRef}
            className="space-y-8 overflow-y-auto max-h-[500px] md:max-h-[600px] scroll-smooth hide-scrollbar p-2"
            style={{ scrollSnapType: "y mandatory" }}
          >
            {cultureData.map((item, i) => (
              <div
                key={i}
                data-index={i}
                ref={(el) => (itemRefs.current[i] = el)}
                className="space-y-2 scroll-snap-start"
              >
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="rounded-lg"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Strength;
