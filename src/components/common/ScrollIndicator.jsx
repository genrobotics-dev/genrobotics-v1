"use client";

import React, { useState, useEffect } from 'react';

export default function ScrollIndicator({ color = "#FFD700", textColor = "white" }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleScrollDown = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth',
        });
        setIsVisible(false); // Hide immediately after click
    };

    if (!isVisible) return null;

    return (
        <div
            onClick={handleScrollDown}
            className="flex flex-col items-center justify-center gap-4 animate-fade-in cursor-pointer group transition-opacity duration-500"
        >
            <span
                className="tracking-[0.2em] text-sm font-medium uppercase"
                style={{ color: textColor }}
            >
                Scroll Down
            </span>

            {/* The Arrow converted to pure SVG code */}
            <svg
                width="25"
                height="50"
                viewBox="0 0 24 50"
                fill="none"
                stroke={color}
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="slow-bounce"
            >
                <path d="M12 5v38M19 36l-7 7-7-7" />
            </svg>

            <style jsx>{`
                @keyframes slow-bounce {
                    0%, 100% {
                        transform: translateY(-15%);
                        animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
                    }
                    50% {
                        transform: translateY(0);
                        animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
                    }
                }
                .slow-bounce {
                    animation: slow-bounce 2s infinite;
                }
            `}</style>
        </div>
    );
}