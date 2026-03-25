import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import RelatedBlogs from "./RelatedBlogs";

export default function BlogDetail({ pageData, relatedBlogs = [] }) {
  if (!pageData) return null;
  const { data } = pageData;

  // 1. Accessing the Keywords Group
  const keywordsGroup = data.keywords?.[0] || {};
  const primaryKeywords = keywordsGroup.primary_keywords || "";

  // 2. Accessing the Open Graph Group
  const ogGroup = data.open_graph?.[0] || {};

  return (
    <article className="min-h-screen bg-black text-white py-24 px-6 md:px-12 flex flex-col items-center">
      {/* Header Section */}
      <div className="max-w-5xl w-full text-center mb-16">
        <h1 className="text-2xl md:text-3xl lg:text-4xl leading-[1.1] text-balance">
          {data.seo_title || data.title || data.article_title}
        </h1>
      </div>

      {/* Hero Image Section */}
      <div className="max-w-3xl w-full mb-12 overflow-hidden rounded-lg border border-zinc-900 shadow-2xl">
        <div className="relative aspect-video w-full">
          <PrismicNextImage
            field={data.image || data.article_image}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      </div>

      {/* Summary Section - Highlighted with Yellow Border */}
      {data.summary && (
        <div className="max-w-3xl w-full mb-16">
          <div className="bg-zinc-900/30 border-l-[3px] border-yellow-400 p-8 md:p-10 rounded-r-2xl">
            <p className="text-zinc-200 text-lg md:text-xl leading-relaxed italic opacity-90 wrap-break-word">
              {data.summary}
            </p>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="max-w-3xl w-full wrap-break-word">
        {/* Keywords/Tags 
        {primaryKeywords && (
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {primaryKeywords.split(',').map((tag, i) => (
              <span key={i} className="px-4 py-1.5 border border-zinc-800 text-xs font-medium uppercase tracking-widest text-zinc-500 rounded-full hover:border-yellow-400/50 hover:text-yellow-400 transition-colors duration-300">
                {tag.trim()}
              </span>
            ))}
          </div>
        )}*/}

        {/* Main Content */}
        <div className="max-w-none">
          <PrismicRichText
            field={data.content || data.contents}
            components={{
              heading1: ({ children }) => (
                <h1 className="text-yellow-400 font-bold tracking-normal text-4xl md:text-6xl mb-12 mt-24 leading-[1.1]">
                  {children}
                </h1>
              ),
              heading2: ({ children }) => (
                <h2 className="text-yellow-400 font-bold tracking-normal text-3xl md:text-5xl mb-10 mt-20 leading-tight">
                  {children}
                </h2>
              ),
              heading3: ({ children }) => (
                <h3 className="text-yellow-400 font-bold tracking-normal text-2xl md:text-4xl mb-8 mt-16">
                  {children}
                </h3>
              ),
              heading4: ({ children }) => (
                <h4 className="text-yellow-400 font-bold text-xl md:text-3xl mb-6 mt-12">
                  {children}
                </h4>
              ),
              heading5: ({ children }) => (
                <h5 className="text-yellow-400 font-bold text-lg md:text-2xl mb-4 mt-10">
                  {children}
                </h5>
              ),
              heading6: ({ children }) => (
                <h6 className="text-yellow-400 font-bold text-base md:text-xl mb-4 mt-8">
                  {children}
                </h6>
              ),
              paragraph: ({ children }) => (
                <p className="text-zinc-300 text-lg md:text-xl leading-relaxed mb-8 [&_strong]:text-white">
                  {children}
                </p>
              ),
              listItem: ({ children }) => (
                <li className="text-zinc-300 text-lg md:text-xl leading-relaxed mb-4 list-disc ml-6 [&_strong]:text-white">
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

      <RelatedBlogs blogs={relatedBlogs} />
    </article>
  );
}