// import Awards from "@/components/home/Awards";
import Script from "next/script";
import Intro from "@/components/home/Intro";
import Mission from "@/components/home/Mission";
import Principles from "@/components/home/Principles";
import Testmonials from "@/components/home/Testmonials";
import Verticals from "@/components/home/Verticals";
import Foundation from "@/components/home/Foundation";
import Awards from "@/components/home/Awards";
import Clients from "@/components/home/Clients";
import { client } from "../../prismicio";


export async function generateMetadata() {
  try {
    // Replace with your actual Custom Type and UID
    const page = await client.getByUID("metadata_landing_page", "home");

    // Adapt to Prismic's response structure (array for Rich Text fields)
    const {
      meta_title,
      meta_description,
      keyword,
      secondary_keyword
    } = page.data || {};

    // Prismic text fields may come as arrays of objects with .text property (Rich Text)
    const getText = (field) => {
      if (Array.isArray(field) && field.length > 0 && typeof field[0].text === "string") {
        return field.map(f => f.text).join(" "); // Join paragraphs if multiple
      } else if (typeof field === "string") {
        return field;
      }
      return "";
    };

    const title = meta_title || "Genrobotics | Robotics & AI Solutions for Sanitation, Healthcare & Industrial Sectors";
    const description = getText(meta_description) || "Genrobotics develops robotics and AI solutions across sanitation, healthcare, oil & gas, and research, delivering safe, reliable, and efficient operations.";
    const primaryKeywords = getText(keyword);
    const secondaryKeywords = getText(secondary_keyword);

    const keywords = (primaryKeywords && secondaryKeywords)
      ? `${primaryKeywords}, ${secondaryKeywords}`
      : [
        // Primary keywords
        "robotics solutions",
        "AI robotics",
        "industrial robotics",
        "sanitation robots",
        "healthcare robotics",
        "oil gas robotics",
        "robotic automation",
        "Genrobotics",
        // Secondary keywords
        "robotics company India",
        "robotic engineering",
        "automation technology",
        "smart robotics",
        "robotic systems",
        "AI automation",
        "robotics innovation",
        "robotic manufacturing",
        "robotics research",
        "robotic solutions provider"
      ].join(", ");

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical: "https://www.genrobotics.com",
      },
      openGraph: {
        title,
        description,
      },
    };
  } catch (error) {
    console.warn("Metadata fetch failed:", error);
    return {
      title: "Home | Default Title",
      description: "Welcome to Genrobotics.",
      keywords: [
        // Primary keywords
        "robotics solutions",
        "AI robotics",
        "industrial robotics",
        "sanitation robots",
        "healthcare robotics",
        "oil gas robotics",
        "robotic automation",
        "Genrobotics",
        // Secondary keywords
        "robotics company India",
        "robotic engineering",
        "automation technology",
        "smart robotics",
        "robotic systems",
        "AI automation",
        "robotics innovation",
        "robotic manufacturing",
        "robotics research",
        "robotic solutions provider"
      ].join(", "),
      alternates: {
        canonical: "https://www.genrobotics.com",
      },
    };
  }
}

export default function Home() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Genrobotic Innovations Pvt Ltd",
    url: "https://www.genrobotics.com",
    logo: "https://www.genrobotics.com/path/to/logo.png",
    description:
      "Genrobotics pioneers advanced robotic solutions engineered for the most hazardous environments where human life is at stake.",
    address: {
      "@type": "PostalAddress",
      streetAddress:
        "Robotics and AI Research Centre, 4th floor, CDAC-Knowledge Resource Centre Building, Technopark Campus",
      addressLocality: "Kazhakkoottam, Thiruvananthapuram",
      addressRegion: "Kerala",
      postalCode: "695581",
      addressCountry: "IN",
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+91-9961616166",
        contactType: "customer service",
        email: "info@genrobotics.com",
        availableLanguage: "English",
      },
    ],
    sameAs: [
      "https://www.linkedin.com/company/genrobotics",
      "https://twitter.com/genrobotics",
      "https://www.facebook.com/genrobotics",
    ],
  };
  return (
    <>
      <main>
        <div className="z-10">
          <div className="relative">
            <Intro />
            <Mission />
          </div>
          <Verticals />
          <Foundation />
          <Awards />
          <Principles />
          <Testmonials />
          <Clients />
        </div>
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </main>
    </>
  );
}
