"use client";
import React from "react";
import Image from "next/image";
import VerticalCarousel from "./VerticalCarousel";
import HorizontalCarousel from "./HorizontalCarousel";
import Link from "next/link";

const foundations = [
  { id: "1", src: "/home/foundations/foundation1.webp", alt: "Nagarcoil-city" },
  { id: "2", src: "/home/foundations/foundation2.webp", alt: "Nagarcoil-city" },
  { id: "3", src: "/home/foundations/foundation3.webp", alt: "Nagarcoil-city" },
  { id: "4", src: "/home/foundations/foundation4.webp", alt: "Nagarcoil-city" },
  { id: "5", src: "/home/foundations/foundation5.webp", alt: "Nagarcoil-city" },
  { id: "6", src: "/home/foundations/foundation6.webp", alt: "Nagarcoil-city" },
  { id: "7", src: "/home/foundations/foundation7.webp", alt: "Nagarcoil-city" },
  { id: "8", src: "/home/foundations/foundation8.webp", alt: "Nagarcoil-city" },
  { id: "9", src: "/home/foundations/foundation9.webp", alt: "Nagarcoil-city" },
  {
    id: "10",
    src: "/home/foundations/foundation10.webp",
    alt: "Nagarcoil-city",
  },
  {
    id: "11",
    src: "/home/foundations/foundation11.webp",
    alt: "Nagarcoil-city",
  },
  {
    id: "12",
    src: "/home/foundations/foundation12.webp",
    alt: "Nagarcoil-city",
  },
  {
    id: "13",
    src: "/home/foundations/foundation13.webp",
    alt: "Nagarcoil-city",
  },
  {
    id: "14",
    src: "/home/foundations/foundation14.webp",
    alt: "Nagarcoil-city",
  },
  {
    id: "15",
    src: "/home/foundations/foundation15.webp",
    alt: "Nagarcoil-city",
  },
  {
    id: "16",
    src: "/home/foundations/foundation16.webp",
    alt: "Nagarcoil-city",
  },
];

function Foundation() {
  return (
    <section className="my-16 lg:my-24">
      <div className="container mx-auto px-4 md:px-8 lg:p-12">
        <div className="flex flex-col-reverse lg:flex-row items-center lg:items-start gap-8">
          {/* LEFT COLUMN: Vertical Carousel (Desktop) / Horizontal (Mobile) */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end flex-1">
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end flex-1">
              <VerticalCarousel items={foundations} debug />
            </div>
            <div className="w-full lg:hidden">
              <HorizontalCarousel items={foundations} />
            </div>
          </div>

          {/* RIGHT COLUMN: Text Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center lg:justify-start text-center lg:text-left">
            <div className="w-[60%] xl:w-[50%] aspect-[17/6] mx-auto lg:mx-0 relative">
              <Image
                src="/home/foundation-logo.svg"
                alt="Genrobotics Foundation Logo"
                fill
                priority
              />
            </div>

            <h2 className="font-anton text-[#FCD901] text-2xl md:text-3xl lg:text-[40px]">
              Our Social Commitment{" "}
            </h2>

            <div className="w-full h-px bg-gradient-to-r from-black/0 via-[#FCD901] to-black/0 lg:from-[#FCD901] lg:to-black/0 my-4"></div>

            <p className="text-xl text-white text-justify font-thin leading-relaxed">
              The Genrobotics Foundation is our commitment to giving back to
              society. We believe in creating a more inclusive world by
              shortening the gap for those in need. Our work focuses on
              empowering communities through education, rehabilitating workers,
              and providing support to children and the elderly. Our mission is
              to go beyond technology to build a future where everyone has the
              opportunity to thrive.
            </p>

            {/* Optional Button */}
            <Link href="https://genroboticsfoundation.com/" className="mt-8 px-6 py-3 bg-[#FCD901] text-black font-semibold rounded-xl w-fit mx-auto lg:mx-0" target="_blank">Discover Our Impact</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Foundation;
