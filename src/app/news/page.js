import Intro from "@/components/news/Intro";
import TopStories from "@/components/news/TopStories";
import Articles from "@/components/news/Articles";
import { client } from "../../../prismicio";

export async function generateMetadata() {
  try {
    // Replace with your actual Custom Type and UID
    const page = await client.getByUID("metadata_landing_page", "news");


    const { meta_title, meta_description, keyword, secondary_keyword } = page.data || {};

    const getText = (field) => {
      if (Array.isArray(field) && field.length > 0 && typeof field[0].text === "string") {
        return field.map(f => f.text).join(" "); // Join paragraphs if multiple
      } else if (typeof field === "string") {
        return field;
      }
      return "";
    };

    const title = meta_title || "Robotics News | Genrobotics Press Releases & Media Updates"
    const description = getText(meta_description) || "Explore robotics news and press releases from Genrobotics. Get insights into our innovations, partnerships, and milestones transforming the robotics industry."
    const primaryKeywords = getText(keyword);
    const secondaryKeywords = getText(secondary_keyword);

    return {
      title,
      description,
      keywords: primaryKeywords && secondaryKeywords
        ? `${primaryKeywords}, ${secondaryKeywords}`
        : "",
      alternates: {
        canonical: "https://genrobotics.com/news",
      },
      openGraph: {
        title,
        description
      },
    };
  } catch (error) {
    console.warn("Metadata fetch failed:", error);
    return {
      title: "Robotics News | Genrobotics Press Releases & Media Updates",
      description: "Explore robotics news and press releases from Genrobotics. Get insights into our innovations, partnerships, and milestones transforming the robotics industry.",
      keywords: "",
      alternates: {
        canonical: "https://genrobotics.com/news",
      },
    };
  }
}

export default function News() {
  return (
    <main className="relative w-full overflow-x-hidden">
      {/* Fixed Hero Section */}
      <Intro />

      {/* Content starts below the hero */}
      <div className="relative z-20 pt-[100vh]">
        <TopStories />
        <Articles />
      </div>
    </main>
  );
}
