// app/case-studies/[slug]/page.jsx
import { client } from "../../../../prismicio";
import Image from "next/image";
import { PrismicRichText } from "@prismicio/react";
import serializers from "@/components/richtext/PrismicSerializers";

export const dynamic = 'force-static';
export const revalidate = 60
export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const resolvedParams = await params;

  try {
    const caseStudy = await client.getByUID("case_studies", resolvedParams.slug);

    if (!caseStudy) {
      return {
        title: "Case Study Not Found | Genrobotics",
        description: "The requested case study could not be found.",
        alternates: {
          canonical: `https://www.genrobotics.com/case-study/${resolvedParams.slug}`,
        },
      };
    }

    const { seo_title, meta_description, primary_keywords, secondary_keywords, voice_search_keywords } = caseStudy.data || {};
    const caseStudyTitle = caseStudy.data?.title?.[0]?.text || 'Untitled';
    const caseStudySummary = caseStudy.data?.summary || '';

    // Helper to extract keywords from Prismic rich text or string
    const getKeywords = (field) => {
      if (Array.isArray(field)) {
        return field.map(k => typeof k.text === "string" ? k.text : "").join(" ");
      } else if (typeof field === "string") {
        return field;
      }
      return "";
    };

    const keywords = [
      getKeywords(primary_keywords),
      getKeywords(secondary_keywords),
      getKeywords(voice_search_keywords)
    ].filter(Boolean).join(", ");

    return {
      title: seo_title || `${caseStudyTitle} | Genrobotics Case Study`,
      description: meta_description || caseStudySummary || `Read about ${caseStudyTitle} - a Genrobotics case study showcasing robotics solutions and success stories.`,
      keywords,
      alternates: {
        canonical: `https://www.genrobotics.com/case-study/${resolvedParams.slug}`,
      },
      openGraph: {
        title: seo_title || `${caseStudyTitle} | Genrobotics Case Study`,
        description: meta_description || caseStudySummary || `Read about ${caseStudyTitle} - a Genrobotics case study.`,
        images: caseStudy.data?.image?.url ? [
          {
            url: caseStudy.data.image.url,
            width: caseStudy.data.image.dimensions?.width || 1200,
            height: caseStudy.data.image.dimensions?.height || 600,
            alt: caseStudy.data.image.alt || caseStudyTitle,
          }
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: seo_title || `${caseStudyTitle} | Genrobotics Case Study`,
        description: meta_description || caseStudySummary || `Read about ${caseStudyTitle} - a Genrobotics case study.`,
        images: caseStudy.data?.image?.url ? [caseStudy.data.image.url] : [],
      },
    };
  } catch (error) {
    console.warn("Metadata fetch failed for case study:", error);
    return {
      title: "Case Study | Genrobotics",
      description: "Read robotics case studies and success stories from Genrobotics.",
      keywords: "robotics case studies, robotics success stories, robotics solutions, robotics implementation, robotics projects, robotics applications, robotics impact, robotics transformation, Genrobotics case studies",
      alternates: {
        canonical: `https://www.genrobotics.com/case-study/${resolvedParams.slug}`,
      },
    };
  }
}

export async function generateStaticParams() {
  try {
    const caseStudies = await client.getAllByType("case_studies");

    if (!caseStudies || caseStudies.length === 0) {
      console.log("No case studies found, returning empty array");
      return [];
    }

    return caseStudies.map((cs) => ({ slug: cs.uid }));
  } catch (error) {
    console.error("Error in generateStaticParams for case studies:", error);
    return [];
  }
}

// Simple utility to convert plain URLs in text into clickable anchor elements.
function linkify(text) {
  if (!text) return null;
  const parts = text.split(/(https?:\/\/[^\s)]+)/g);
  return parts.map((part, i) => {
    if (/^https?:\/\//i.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-300 underline hover:text-blue-100"
        >
          {part}
        </a>
      );
    }
    return part;
  });
}

export default async function CaseStudyDetailPage({ params }) {
  const resolvedParams = await params; // normalize Promise params in Next 15+
  const cs = await client.getByUID("case_studies", resolvedParams.slug).catch(() => null);

  if (!cs) {
    return <p className="text-center py-10">Case study not found.</p>;
  }

  return (
    <article className="max-w-3xl mx-auto px-6 py-12 md:py-16 my-16 md:my-24">
      {/* Banner image above the title */}
      {cs?.data?.image?.url && (
        <figure className="mb-8">
          <Image
            src={cs.data.image.url}
            alt={cs.data.image.alt || 'Case Study banner'}
            width={cs.data.image.dimensions?.width || 1200}
            height={cs.data.image.dimensions?.height || 600}
            className="rounded-xl mb-6 w-full object-cover"
          />
        </figure>
      )}

      {/* Title */}
      <h1 className="text-3xl font-bold mb-6 text-white text-center">
        {cs.data?.title?.[0]?.text || 'Untitled'}
      </h1>

      {/* Summary as content block */}
      {cs.data?.summary && (
        <section>
          <h4 className="text-xl font-semibold mt-8 text-[#FCD901]">SUMMARY</h4>
          <p className="mb-2 text-gray-200 text-xs sm:text-sm md:text-base leading-relaxed text-justify">
            {/<[a-z][\s\S]*>/i.test(cs.data.summary) ? (
              <span dangerouslySetInnerHTML={{ __html: cs.data.summary }} />
            ) : (
              linkify(cs.data.summary)
            )}
          </p>
        </section>
      )}

      <PrismicRichText
        field={cs?.data?.section?.content || cs?.data?.content || cs?.data?.body}
        components={serializers}
      />
    </article>
  );
}