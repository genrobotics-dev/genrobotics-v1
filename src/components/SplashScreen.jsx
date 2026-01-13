"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../public/logo_main.svg";

const SplashScreen = () => {
    const [visible, setVisible] = useState(true);
    const [fadeOut, setFadeOut] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Animate progress from 0 to 100 over ~5 seconds
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                return prev + 1;
            });
        }, 50); // 100 steps * 50ms = 5000ms = 5 seconds

        const fadeOutTimer = setTimeout(() => setFadeOut(true), 5000); // Start fading out after 5 seconds
        const removeTimer = setTimeout(() => setVisible(false), 6000); // Remove component after 6 seconds (1s fade + 5s initial)

        return () => {
            clearInterval(interval);
            clearTimeout(fadeOutTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    if (!visible) return null;

    return (
        <div
            className={`fixed inset-0 z-[99999] flex items-center justify-center bg-black transition-opacity duration-1000 ${fadeOut ? "opacity-0" : "opacity-100"
                }`}
        >
            <div className="text-center w-[90%] max-w-md mx-auto">
                <div className="flex flex-col items-center animate-fade-up space-y-4">
                    <Image
                        src={Logo}
                        alt="Gen Robotics Logo"
                        width={700}
                        height={700}
                        className="mx-auto"
                        style={{ width: "100%", height: "auto" }}
                    />

                    {/* Loader bar */}
                    <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-[#fcd901] transition-all duration-100"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;
