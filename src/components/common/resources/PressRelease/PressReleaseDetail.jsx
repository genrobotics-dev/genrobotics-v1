import { PrismicRichText } from "@prismicio/react";
import Image from "next/image";

export default function PressReleaseDetail({ pageData }) {
  if (!pageData) return null;
  const { data } = pageData;

  const dateString = pageData.first_publication_date || pageData.last_publication_date || data?.date;

  const formatDate = (date) => {
    if (!date) return null;
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date));
  };

  return (
    <article className="min-h-screen bg-black text-white py-24 px-6 md:px-12 flex flex-col items-center">
      {/* Header Section */}
      <div className="max-w-3xl w-full text-center my-16">
        <h1 className="text-2xl md:text-3xl lg:text-4xl leading-[1.1] text-balance mb-6 font-anton font-medium">
          {data.seo_title || data.title || data.article_title}
        </h1>
        
        {/* Date and Location */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-zinc-400 text-sm md:text-base uppercase tracking-widest font-medium">
          {dateString && (
            <span>{formatDate(dateString)}</span>
          )}
          {dateString && data.location && (
            <span className="text-yellow-400">•</span>
          )}
          {data.location && (
            <span>{data.location}</span>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-3xl w-full wrap-break-word">
        {data.image && data.image.url && (
          <div className="w-full mb-12 relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
            <Image
              src={data.image.url}
              alt={data.image.alt || data.seo_title || data.title || "Press Release Image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>
        )}
        {/* Main Content */}
        <div className="max-w-none">
          <PrismicRichText
            field={data.content || data.contents}
            components={{
              heading1: ({ children }) => (
                <h1 className="text-[#fcd901] font-bold tracking-normal text-4xl md:text-6xl mb-12 mt-24 leading-[1.1]">
                  {children}
                </h1>
              ),
              heading2: ({ children }) => (
                <h2 className="text-[#fcd901] font-bold tracking-normal text-3xl md:text-5xl mb-10 mt-20 leading-tight">
                  {children}
                </h2>
              ),
              heading3: ({ children }) => (
                <h3 className="text-[#fcd901] font-bold tracking-normal text-2xl md:text-4xl mb-8 mt-16">
                  {children}
                </h3>
              ),
              heading4: ({ children }) => (
                <h4 className="text-[#fcd901] font-bold text-xl md:text-3xl mb-6 mt-12">
                  {children}
                </h4>
              ),
              heading5: ({ children }) => (
                <h5 className="text-[#fcd901] font-bold text-lg md:text-2xl mb-4 mt-10">
                  {children}
                </h5>
              ),
              heading6: ({ children }) => (
                <h6 className="text-[#fcd901] font-bold text-base md:text-xl mb-4 mt-8">
                  {children}
                </h6>
              ),
              paragraph: ({ children }) => (
                <p className="text-zinc-300 text-justify text-lg md:text-xl leading-relaxed mb-8 [&_strong]:text-white">
                  {children}
                </p>
              ),
              listItem: ({ children }) => (
                <li className="text-zinc-300 text-justify text-lg md:text-xl leading-relaxed mb-4 list-disc ml-6 [&_strong]:text-white">
                  {children}
                </li>
              ),
              oListItem: ({ children }) => (
                <li className="text-zinc-300 text-lg md:text-xl leading-relaxed mb-4 list-decimal ml-6 [&_strong]:text-white">
                  {children}
                </li>
              ),
              strong: ({ children }) => (
                <strong className="font-bold">
                  {children}
                </strong>
              ),
              hyperlink: ({ children, node }) => (
                <a href={node.data.url} className="text-yellow-400 hover:text-yellow-300 transition-colors underline decoration-yellow-400/30 underline-offset-4">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </div>
    </article>
  );
}
