import Intro from "@/components/careers/Intro";
import Strength from "@/components/careers/Strength";
import JobSearch from "@/components/careers/JobSearch";
import CandidatePortal from "@/components/careers/CandidatePortal";
import Gallery from "@/components/careers/Gallery";
import { client } from "../../../prismicio";

export async function generateMetadata() {
  try {
    // Replace with your actual Custom Type and UID
    const page = await client.getByUID("metadata_landing_page", "careers");

    const { meta_title, meta_description, keyword, secondary_keyword } = page.data || {};

    const getText = (field) => {
      if (Array.isArray(field) && field.length > 0 && typeof field[0].text === "string") {
        return field.map(f => f.text).join(" "); // Join paragraphs if multiple
      } else if (typeof field === "string") {
        return field;
      }
      return "";
    };

    const title = meta_title || "Genrobotics Careers | Find Robotics Jobs & Engineering Roles in India";
    const description = getText(meta_description) || "Apply now at Genrobotics Careers for robotics job roles across engineering, AI, and design. Be part of a pioneering team creating advanced solutions for a smarter world.";
    const primaryKeywords = getText(keyword);
    const secondaryKeywords = getText(secondary_keyword);

    return {
      title,
      description,
      keywords: primaryKeywords && secondaryKeywords
        ? `${primaryKeywords}, ${secondaryKeywords}`
        : "",
      alternates: {
        canonical: "https://genrobotics.com/careers",
      },
      openGraph: {
        title,
        description,
      },
    };
  } catch (error) {
    console.warn("Metadata fetch failed:", error);
    return {
      title: "Genrobotics Careers | Find Robotics Jobs & Engineering Roles in India",
      description: "Apply now at Genrobotics Careers for robotics job roles across engineering, AI, and design. Be part of a pioneering team creating advanced solutions for a smarter world.",
      keywords: "",
      alternates: {
        canonical: "https://genrobotics.com/careers",
      },
    };
  }
}

export default function Careers() {
  return (
    <main className="relative">
      {/* Fixed Intro Section */}
      <Intro />

      {/* Rest of the content starts below */}
      <div className="relative z-20 pt-[100vh]">
        <Strength />
        <JobSearch />
        {/* <CandidatePortal /> */}
        <Gallery />
      </div>
    </main>
  );
}
