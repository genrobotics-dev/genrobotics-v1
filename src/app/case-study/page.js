import Intro from "@/components/case-study/Intro";
import CaseStudy from "@/components/case-study/CaseStudy";
import { client } from "../../../prismicio";

export async function generateMetadata() {
    try {
        // Replace with your actual Custom Type and UID
        const page = await client.getByUID("metadata_landing_page", "case-studies");

        const { meta_title, meta_description, keyword, secondary_keyword } = page.data || {};
        const getText = (field) => {
            if (Array.isArray(field) && field.length > 0 && typeof field[0].text === "string") {
                return field.map(f => f.text).join(" "); // Join paragraphs if multiple
            } else if (typeof field === "string") {
                return field;
            }
            return "";
        };

        const title = meta_title || "Robotics Case Studies | Genrobotics Success Stories & Solutions";
        const description = getText(meta_description) || "Discover robotics case studies that highlight Genrobotics' impact across industries. Learn how our robotic solutions drive efficiency, safety, and social transformation..";
        const primaryKeywords = getText(keyword);
        const secondaryKeywords = getText(secondary_keyword);

        return {
            title,
            description,
            keywords: primaryKeywords && secondaryKeywords
                ? `${primaryKeywords}, ${secondaryKeywords}`
                : "",
            alternates: {
                canonical: "https://www.genrobotics.com/case-study",
            },
            openGraph: {
                title: meta_title,
                description: meta_description,
            },
        };
    } catch (error) {
        console.warn("Metadata fetch failed:", error);
        return {
            title: "Robotics Case Studies | Genrobotics Success Stories & Solutions",
            description: "Discover robotics case studies that highlight Genrobotics' impact across industries. Learn how our robotic solutions drive efficiency, safety, and social transformation..",
            keywords: "",
            alternates: {
                canonical: "https://www.genrobotics.com/case-study",
            },
        };
    }
}

import { Suspense } from "react";

export default function Page() {
    return (
        <main className="relative">
            {/* Fixed hero */}
            <Intro />

            {/* Content below */}
            <div className="relative z-20 pt-[100vh]">
                <Suspense fallback={<div className="text-white text-center py-20">Loading case studies...</div>}>
                    <CaseStudy />
                </Suspense>
            </div>
        </main>
    );
}
