"use client";
import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // mobile menu
  const [resourcesOpen, setResourcesOpen] = useState(false); // desktop dropdown
  const [verticalsOpen, setVerticalsOpen] = useState(false); // desktop verticals dropdown
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false); // mobile dropdown
  const [mobileVerticalsOpen, setMobileVerticalsOpen] = useState(false); // mobile verticals dropdown
  const [mounted, setMounted] = useState(false);

  const dropdownRef = useRef(null);
  const verticalsDropdownRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);

    // Close desktop dropdown on click outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setResourcesOpen(false);
      }
      if (verticalsDropdownRef.current && !verticalsDropdownRef.current.contains(event.target)) {
        setVerticalsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleLogoClick = () => {
    if (typeof window !== "undefined") {
      window.location.href = "https://genrobotics.com";
    }
  };

  const handleResourcesKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setResourcesOpen((s) => !s);
    }
  };

  const handleVerticalsKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setVerticalsOpen((s) => !s);
    }
  };

  const handleMobileResourcesKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setMobileResourcesOpen((s) => !s);
    }
  };

  const handleMobileVerticalsKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setMobileVerticalsOpen((s) => !s);
    }
  };

  // if (!mounted) return null;

  return (
    <nav className="fixed top-0 w-full z-[100] px-4 sm:px-8 lg:px-12 py-4 sm:py-6 lg:py-8 flex items-center justify-between bg-black/80 transition-all duration-300">
      {/* Logo */}
      <a href="https://genrobotics.com" aria-label="Genrobotics homepage" className="flex-shrink-0">
        <Image
          src="/layout/gen-logo.svg"
          alt="Genrobotics logo"
          width={200}
          height={50}
          className="w-32 sm:w-40 md:w-48 lg:w-[250px] h-auto"
          priority
        />
      </a>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
        <div
          className={`flex space-x-4 lg:space-x-8 px-3 sm:px-4 py-1 ${pathname === "/CSR/" ? "bg-black/40" : "bg-[#2b2b2b]"
            } rounded-lg`}
        >
          <Link
            href="/"
            className="text-white font-thin text-sm sm:text-base cursor-pointer hover:text-[#FCD901]"
          >
            Home
          </Link>
          {/* Desktop Verticals Dropdown */}
          <div
            ref={verticalsDropdownRef}
            className="relative"
            onMouseEnter={() => setVerticalsOpen(true)}
            onMouseLeave={() => setVerticalsOpen(false)}
          >
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={verticalsOpen}
              aria-controls="verticals-menu"
              onClick={() => setVerticalsOpen((s) => !s)}
              onKeyDown={handleVerticalsKeyDown}
              className="text-white font-thin text-sm sm:text-base flex items-center gap-1 cursor-pointer hover:text-[#FCD901] focus:outline-none focus:ring-2 focus:ring-[#FCD901]"
            >
              Verticals
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform ${verticalsOpen ? "rotate-180" : "rotate-0"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {verticalsOpen && (
              <div id="verticals-menu" role="menu" className="absolute left-0 pt-2 w-56 z-50">
                <div className="bg-[#2b2b2b] rounded-lg shadow-lg py-2">
                  <a href="https://sanitation.genrobotics.com" onClick={() => setVerticalsOpen(false)} role="menuitem" className="block px-4 py-2 text-sm text-white hover:bg-black/40 cursor-pointer hover:text-[#FCD901]" target="_blank" rel="noopener noreferrer">Sanitation-tech</a>
                  <a href="https://medical.genrobotics.com" onClick={() => setVerticalsOpen(false)} role="menuitem" className="block px-4 py-2 text-sm text-white hover:bg-black/40 cursor-pointer hover:text-[#FCD901]" target="_blank" rel="noopener noreferrer">Medical and Mobility</a>
                  <a href="https://research.genrobotics.com" onClick={() => setVerticalsOpen(false)} role="menuitem" className="block px-4 py-2 text-sm text-white hover:bg-black/40 cursor-pointer hover:text-[#FCD901]" target="_blank" rel="noopener noreferrer">Research and Development</a>
                  <a href="https://defence.genrobotics.com" onClick={() => setVerticalsOpen(false)} role="menuitem" className="block px-4 py-2 text-sm text-white hover:bg-black/40 cursor-pointer hover:text-[#FCD901]" target="_blank" rel="noopener noreferrer">Defence and Aerospace</a>

                </div>
              </div>
            )}
          </div>

          {/* Desktop Resources Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
          >
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={resourcesOpen}
              aria-controls="resources-menu"
              onClick={() => setResourcesOpen((s) => !s)}
              onKeyDown={handleResourcesKeyDown}
              className="text-white font-thin text-sm sm:text-base flex items-center gap-1 cursor-pointer hover:text-[#FCD901] focus:outline-none focus:ring-2 focus:ring-[#FCD901]"
            >
              Resources
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transition-transform ${resourcesOpen ? "rotate-180" : "rotate-0"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {resourcesOpen && (
              <div id="resources-menu" role="menu" className="absolute left-0 pt-2 w-40 z-50">
                <div className="bg-[#2b2b2b] rounded-lg shadow-lg py-2">
                  <Link href="/news" onClick={() => setResourcesOpen(false)} role="menuitem" className="block px-4 py-2 text-sm text-white hover:bg-black/40 cursor-pointer hover:text-[#FCD901]">News</Link>
                  <Link href="/case-study" onClick={() => setResourcesOpen(false)} role="menuitem" className="block px-4 py-2 text-sm text-white hover:bg-black/40 cursor-pointer hover:text-[#FCD901]">Case Studies</Link>
                  <Link href="/blogs" onClick={() => setResourcesOpen(false)} role="menuitem" className="block px-4 py-2 text-sm text-white hover:bg-black/40 cursor-pointer hover:text-[#FCD901]">Blogs</Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/careers"
            className="text-white font-thin text-sm sm:text-base cursor-pointer hover:text-[#FCD901]"
          >
            Careers
          </Link>
          <Link
            href="/about"
            className="text-white font-thin text-sm sm:text-base cursor-pointer hover:text-[#FCD901]"
          >
            About Us
          </Link>
        </div>

        {/* Contact button */}
        <Link
          href="/contact"
          className="hidden md:flex px-3 py-1 bg-[#FCD901] rounded-lg font-medium text-sm cursor-pointer"
        >
          Contact Us
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
          aria-expanded={isOpen}
          className="text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-7 w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Modal */}
      <div
        className={`fixed inset-0 flex items-start justify-center bg-black/70 z-40 transition-opacity duration-300 ${isOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="relative rounded-xl h-dvh w-11/12 max-w-md p-8 flex flex-col justify-center space-y-6 text-center bg-black/80 border border-gray-700/50 shadow-2xl">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
            className="absolute top-4 right-4 text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <Link
            href="/"
            className="text-white font-medium text-2xl hover:text-yellow-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          {/* Mobile Verticals Collapsible */}
          <div className="relative flex flex-col items-center w-full">
            <button
              type="button"
              onClick={() => setMobileVerticalsOpen(!mobileVerticalsOpen)}
              aria-expanded={mobileVerticalsOpen}
              aria-controls="mobile-verticals-menu"
              onKeyDown={handleMobileVerticalsKeyDown}
              className="w-full text-white font-medium text-2xl cursor-pointer hover:text-yellow-400 transition-colors text-center relative focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              Verticals
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform absolute top-2 right-2 ${mobileVerticalsOpen ? "rotate-180" : "rotate-0"
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {mobileVerticalsOpen && (
              <div id="mobile-verticals-menu" role="menu" className="flex flex-col mt-3 space-y-3">
                <a
                  href="https://sanitation.genrobotics.com"
                  className="text-white font-medium text-xl hover:text-yellow-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                  role="menuitem"
                  target="_blank" rel="noopener noreferrer"
                >
                  Sanitation
                </a>
                <a
                  href="https://medical.genrobotics.com"
                  className="text-white font-medium text-xl hover:text-yellow-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                  role="menuitem"
                  target="_blank" rel="noopener noreferrer"
                >
                  Medical and Mobility
                </a>
                <a
                  href="https://research.genrobotics.com"
                  className="text-white font-medium text-xl hover:text-yellow-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                  role="menuitem"
                  target="_blank" rel="noopener noreferrer"
                >
                  Research and Development
                </a>
              </div>
            )}
          </div>

          {/* Mobile Resources Collapsible */}
          <div className="relative flex flex-col items-center w-full">
            <button
              type="button"
              onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
              aria-expanded={mobileResourcesOpen}
              aria-controls="mobile-resources-menu"
              onKeyDown={handleMobileResourcesKeyDown}
              className="w-full text-white font-medium text-2xl cursor-pointer hover:text-yellow-400 transition-colors text-center relative focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              Resources
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-transform absolute top-2 right-2 ${mobileResourcesOpen ? "rotate-180" : "rotate-0"
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {mobileResourcesOpen && (
              <div id="mobile-resources-menu" role="menu" className="flex flex-col mt-3 space-y-3">
                <Link
                  href="/news"
                  className="text-white font-medium text-xl hover:text-yellow-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                  role="menuitem"
                >
                  News
                </Link>
                <Link
                  href="/case-study"
                  className="text-white font-medium text-xl hover:text-yellow-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                  role="menuitem"
                >
                  Case Studies
                </Link>
                <Link
                  href="/blogs"
                  className="text-white font-medium text-xl hover:text-yellow-400 transition-colors"
                  onClick={() => setIsOpen(false)}
                  role="menuitem"
                >
                  Blogs
                </Link>
              </div>
            )}
          </div>

          <Link
            href="/careers"
            className="text-white font-medium text-2xl hover:text-yellow-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Careers
          </Link>
          <Link
            href="/about"
            className="text-white font-medium text-2xl hover:text-yellow-400 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            About Us
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 bg-yellow-400 rounded-lg font-bold text-black hover:bg-yellow-300 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
