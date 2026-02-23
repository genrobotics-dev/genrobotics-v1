import Investors from "@/components/about/Investors";
import Leadership from "@/components/about/Leadership";
import Intro from "@/components/about/Intro";
import CraftingRobotics from "@/components/about/CraftingRobotics";
import ApplyingRobotics from "@/components/about/ApplyingRobotics";
import Wings from "@/components/about/Wings";
import Journey from "@/components/about/Journey";
import Founders from "@/components/about/Founders";
import { client } from "../../../prismicio";

export async function generateMetadata() {
  try {
    // Replace with your actual Custom Type and UID
    const page = await client.getByUID("metadata_landing_page", "about-us");

    const { meta_title, meta_description, keyword, secondary_keyword } = page.data || {};

    const getText = (field) => {
      if (Array.isArray(field) && field.length > 0 && typeof field[0].text === "string") {
        return field.map(f => f.text).join(" "); // Join paragraphs if multiple
      } else if (typeof field === "string") {
        return field;
      }
      return "";
    };

    const title = meta_title || "About Genrobotics | India's Top Robot Makers & Manufacturers";
    const description = getText(meta_description) || "The expert robot makers in India. We rank high among robot manufacturing companies in India for our ethical and transformative robotic solutions..";
    const primaryKeywords = getText(keyword);
    const secondaryKeywords = getText(secondary_keyword);


    return {
      title,
      description,
      keywords: primaryKeywords && secondaryKeywords
        ? `${primaryKeywords}, ${secondaryKeywords}`
        : "",
      alternates: {
        canonical: "https://www.genrobotics.com/about",
      },
      openGraph: {
        title,
        description
      },
    };
  } catch (error) {
    console.warn("Metadata fetch failed:", error);
    return {
      title: "About Genrobotics | India's Top Robot Makers & Manufacturers",
      description: "The expert robot makers in India. We rank high among robot manufacturing companies in India for our ethical and transformative robotic solutions..",
      keywords: "",
      alternates: {
        canonical: "https://www.genrobotics.com/about",
      },
    };
  }
}

export default function About() {
  return (
    <main className="relative">
      {/* fixed hero */}
      <Intro />

      {/* push everything below the hero so the initial view is the hero */}
      <div className="relative z-0 pt-[100vh]">
        <CraftingRobotics />
        <ApplyingRobotics />
        <Journey />
        <Wings />
        <Founders />
        <Leadership />
        <Investors />
      </div>
    </main>
  );
}