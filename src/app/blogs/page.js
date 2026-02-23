import Blogs from "@/components/blogs/Blogs";
import Intro from "@/components/blogs/Intro";
import React from "react";
import { client } from "../../../prismicio";
export async function generateMetadata() {
    try {
        // Replace with your actual Custom Type and UID
        const page = await client.getByUID("metadata_landing_page", "blogs");

        const { meta_title, meta_description, keyword, secondary_keyword } = page.data || {};

        const getText = (field) => {
            if (Array.isArray(field) && field.length > 0 && typeof field[0].text === "string") {
                return field.map(f => f.text).join(" "); // Join paragraphs if multiple
            } else if (typeof field === "string") {
                return field;
            }
            return "";
        };

        const title = meta_title || "Robotics Articles | Genrobotics Blog on Innovation & Technology";
        const description = getText(meta_description) || "Discover expert robotics articles covering AI, automation, and robotic engineering. Read Genrobotics insights on how robotics is transforming industries and lives.";
        const primaryKeywords = getText(keyword);
        const secondaryKeywords = getText(secondary_keyword);

        return {
            title,
            description,
            keywords: primaryKeywords && secondaryKeywords
                ? `${primaryKeywords}, ${secondaryKeywords}`
                : "",
            alternates: {
                canonical: "https://www.genrobotics.com/blogs",
            },
            openGraph: {
                title,
                description,
            },
        };
    } catch (error) {
        console.warn("Metadata fetch failed:", error);
        return {
            title: "Robotics Articles | Genrobotics Blog on Innovation & Technology",
            description: "Discover expert robotics articles covering AI, automation, and robotic engineering. Read Genrobotics insights on how robotics is transforming industries and lives.",
            keywords: "",
            alternates: {
                canonical: "https://www.genrobotics.com/blogs",
            },
        };
    }
}

import { Suspense } from "react";

const Page = async () => {
    return (
        <main className="relative">
            {/* Fixed hero intro */}
            <Intro />

            {/* Content below hero (overlaps it on scroll) */}
            <div className="relative z-20 pt-[100vh]">
                <Suspense fallback={<div className="text-white text-center py-20">Loading articles...</div>}>
                    <Blogs />
                </Suspense>
            </div>
        </main>
    );
};

export default Page;
