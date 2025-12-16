import { client } from "../../../../prismicio";
import Image from "next/image";
import Link from "next/link";
import { PrismicRichText } from "@prismicio/react";
import serializers from "@/components/richtext/PrismicSerializers";

// Simple utility to convert plain URLs in text into clickable anchor elements.
function linkify(text) {
  if (!text || typeof text !== 'string') return text;
  // Split on URLs, keep the URLs in the result
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

export const dynamic = "force-static";
export const revalidate = 60; // Regenerate data every 1 minute
export const dynamicParams = false;

// Shared keyword extraction helper
const getKeywordsString = (field) => {
  if (Array.isArray(field)) {
    return field.map(k => typeof k.text === "string" ? k.text : "").join(" ");
  } else if (typeof field === "string") {
    return field;
  }
  return "";
};

const extractKeywords = (data) => {
  if (!data) return [];
  const text = [
    getKeywordsString(data.primary_keywords),
    getKeywordsString(data.secondary_keywords),
    getKeywordsString(data.voice_search_keywords)
  ].join(" ").toLowerCase();

  // Split by comma and spaces, remove empty and short words
  return text.split(/[\s,]+/).filter(w => w.length > 1);
}


export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  console.log(resolvedParams);

  try {
    const blog = await client.getByUID("blogs", resolvedParams.slug);

    if (!blog) {
      return {
        title: "Blog Post Not Found | Genrobotics",
        description: "The requested blog post could not be found.",
        alternates: {
          canonical: `https://genrobotics.com/blogs/${resolvedParams.slug}`,
        },
      };
    }

    const { seo_title, meta_description, primary_keywords, secondary_keywords, voice_search_keywords } = blog.data || {};
    const blogTitle = blog.data?.title?.[0]?.text || 'Untitled';
    const blogSummary = blog.data?.summary || '';

    const primary = getKeywordsString(primary_keywords);
    const secondary = getKeywordsString(secondary_keywords);
    const voiceSearch = getKeywordsString(voice_search_keywords);

    const keywords = [primary, secondary, voiceSearch]
      .filter(Boolean)
      .join(", ");

    return {
      title: seo_title || `${blogTitle} | Genrobotics Blog`,
      description: meta_description || blogSummary || `Read about ${blogTitle} on the Genrobotics blog. Discover insights into robotics innovation and technology.`,
      keywords,
      alternates: {
        canonical: `https://genrobotics.com/blogs/${resolvedParams.slug}`,
      },
      openGraph: {
        title: seo_title || `${blogTitle} | Genrobotics Blog`,
        description: meta_description || blogSummary || `Read about ${blogTitle} on the Genrobotics blog.`,
        images: blog.data?.image?.url ? [
          {
            url: blog.data.image.url,
            width: blog.data.image.dimensions?.width || 1200,
            height: blog.data.image.dimensions?.height || 600,
            alt: blog.data.image.alt || blogTitle,
          }
        ] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: seo_title || `${blogTitle} | Genrobotics Blog`,
        description: meta_description || blogSummary || `Read about ${blogTitle} on the Genrobotics blog.`,
        images: blog.data?.image?.url ? [blog.data.image.url] : [],
      },
    };
  } catch (error) {
    console.warn("Metadata fetch failed for blog:", error);
    return {
      title: "Blog Post | Genrobotics",
      description: "Read robotics insights and articles on the Genrobotics blog.",
      keywords: "robotics blog, robotics articles, robotics insights, robotics technology, AI robotics, robotic engineering, robotics innovation, Genrobotics blog",
      alternates: {
        canonical: `https://genrobotics.com/blogs/${resolvedParams.slug}`,
      },
    };
  }
}

export async function generateStaticParams() {
  try {
    const blogs = await client.getAllByType("blogs");
    console.log(blogs);

    if (!blogs) {
      console.log("No blogs found, returning empty array");
      return [];
    }

    return blogs.map((blog) => ({
      slug: blog.uid, // 👈 matches folder name
    }));
  } catch (error) {
    console.error("Error in generateStaticParams for blogs:", error);
    return [];
  }
}

// Utility to clean non-breaking spaces from text
const cleanText = (text) => {
  if (typeof text !== 'string') return text;
  return text.replace(/\u00A0/g, ' ');
};

// Utility to recursively clean Prismic Rich Text fields
const cleanRichText = (richText) => {
  if (!Array.isArray(richText)) return [];
  return richText.map(node => ({
    ...node,
    text: typeof node.text === 'string' ? cleanText(node.text) : '',
    spans: Array.isArray(node.spans) ? node.spans.map(span => ({
      ...span,
      data: span.data && span.data.url ? { ...span.data, url: span.data.url.trim() } : span.data
    })) : []
  }));
};

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params; // ✅ required in Next 15+
  const blog = await client
    .getByUID("blogs", resolvedParams.slug)
    .catch(() => null);

  if (!blog) {
    return <p className="text-center py-10">Blog not found.</p>;
  }

  // Clean the summary and content
  const cleanSummary = cleanText(blog.data?.summary || '');

  // Fallback priority: section.content -> content -> body (only if NOT slices)
  const rawContent = blog?.data?.section?.content || blog?.data?.content || blog?.data?.body;

  // Verify it is likely Rich Text (has 'type' but NO 'slice_type')
  const isValidRichText = Array.isArray(rawContent) && rawContent.every(item => item.type && !item.slice_type);

  const cleanContent = isValidRichText ? cleanRichText(rawContent) : [];

  // --- Related Blogs Logic ---
  // Fetch all blogs to filter for related ones. 
  // In a larger app, you'd use a more specific query or a search service.
  const allBlogs = await client.getAllByType("blogs");
  const currentKeywords = extractKeywords(blog.data);

  console.log(`[RelatedBlogs] Current Blog: ${blog.uid}`);
  console.log(`[RelatedBlogs] Extracted Keywords:`, currentKeywords);

  const relatedBlogs = allBlogs
    .filter(b => b.uid !== blog.uid) // Exclude current blog
    .map(b => {
      const bKeywords = extractKeywords(b.data);
      // Count matching keywords
      const matchCount = bKeywords.filter(k => currentKeywords.includes(k)).length;

      if (matchCount > 0) {
        console.log(`[RelatedBlogs] Match found: ${b.uid} (${matchCount})`);
      }

      return { ...b, matchCount };
    })
    .filter(b => b.matchCount > 0) // Only keep those with at least one match
    .sort((a, b) => b.matchCount - a.matchCount) // Sort by relevance (most matches first)
    .slice(0, 3); // Take top 3

  return (
    <>
      <article className="max-w-3xl mx-auto px-6 py-12 md:py-16 mt-16 md:mt-24 mb-0">
        {/* Banner image above the title */}
        {blog?.data?.image?.url && (
          <figure className="mb-8">
            <Image
              src={blog.data.image.url}
              alt={blog.data.image.alt || 'Blog banner'}
              width={blog.data.image.dimensions?.width || 1200}
              height={blog.data.image.dimensions?.height || 600}
              className="rounded-xl mb-6 w-full object-cover"
            />
          </figure>
        )}

        {/* Title */}
        <h1 className="text-3xl font-bold mb-6 text-white text-center">
          {cleanText(blog.data?.title?.[0]?.text) || 'Untitled'}
        </h1>

        {/* Summary as content block */}
        {cleanSummary && (
          <section>
            <h4 className="text-xl font-semibold mt-8 text-[#FCD901]">Summary</h4>
            <p className="mb-2 text-gray-200 text-xs sm:text-sm md:text-base leading-relaxed text-justify">
              {/* If summary includes HTML tags (unlikely), render as HTML; otherwise linkify plain URLs */}
              {/<[a-z][\s\S]*>/i.test(cleanSummary)
                ? (
                  <span dangerouslySetInnerHTML={{ __html: cleanSummary }} />
                )
                : (
                  linkify(cleanSummary)
                )}
            </p>
          </section>
        )}
        {/* Main blog content */}
        {cleanContent.length > 0 && (
          <PrismicRichText
            field={cleanContent}
            components={serializers}
          />
        )}
      </article>

      {/* Related Blogs Section */}
      {relatedBlogs.length > 0 && (
        <section className="max-w-6xl mx-auto px-6 py-16 border-t border-gray-800 mt-16">
          <h3 className="text-2xl font-bold text-white mb-8">Related Blogs</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedBlogs.map((item, i) => {
              const title = cleanText(item.data.title[0]?.text || "Untitled");
              const summary = cleanText(item.data.summary || "");
              const image = item.data.image?.url;

              return (
                <div
                  key={item.uid}
                  className="flex flex-col justify-between rounded-xl p-6 bg-gradient-to-br from-[#1A1A1A] to-[#000000] border border-[#FCD901]/30 transition duration-300 hover:shadow-lg hover:shadow-[#FCD901]/40 h-full"
                >
                  <div className="flex flex-col gap-1">
                    {image && (
                      <Link
                        href={`/blogs/${item.uid}`}
                        className="block mb-4"
                      >
                        <Image
                          src={image}
                          alt={title}
                          width={400}
                          height={250}
                          className="w-full h-40 object-cover rounded-xl"
                        />
                      </Link>
                    )}
                    <h4 className="font-semibold text-lg text-white leading-tight mb-2">
                      <Link href={`/blogs/${item.uid}`} className="hover:text-[#FCD901] transition-colors">
                        {title}
                      </Link>
                    </h4>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {summary.slice(0, 100)}...
                    </p>
                  </div>
                  <div className="mt-auto">
                    <Link
                      href={`/blogs/${item.uid}`}
                      className="inline-block text-sm font-medium text-black bg-[#FCD901] px-4 py-2 rounded-md hover:bg-[#FFE63D] transition"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
}
