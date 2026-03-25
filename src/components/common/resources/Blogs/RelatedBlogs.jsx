"use client";

import Link from "next/link";
import Image from "next/image";

function BlogCard({ blog }) {
    const { data, uid, first_publication_date } = blog;
    const title = data.seo_title || data.title || "Untitled";
    const summary = data.summary || "";
    const imageUrl = data.image?.url || "/placeholder.jpg";
    const altText = data.image?.alt || title;
    const dateString = data.date || first_publication_date;

    const formatDate = (date) => {
        if (!date) return null;
        return new Intl.DateTimeFormat("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        }).format(new Date(date));
    };

    return (
        <Link
            href={`/blogs/${uid}`}
            className="bg-[#0a0a0a] group border border-zinc-900 hover:border-yellow-400/30 transition-all duration-500 flex flex-col h-full overflow-hidden"
        >
            {/* Image */}
            <div className="relative aspect-[16/10] w-full overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={altText}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
            </div>

            {/* Content */}
            <div className="pt-4 px-4 pb-4 flex flex-col flex-grow">
                {dateString && (
                    <div className="text-yellow-400/60 text-[10px] uppercase tracking-[0.2em] font-medium mb-4">
                        {formatDate(dateString)}
                    </div>
                )}
                <h3 className="text-white text-base font-bold mb-2 leading-[1.3] group-hover:text-yellow-400 transition-colors duration-300 tracking-normal line-clamp-3">
                    {title}
                </h3>
                {summary && (
                    <p className="text-zinc-500 text-xs line-clamp-2 mb-4 flex-grow leading-relaxed font-light">
                        {summary}
                    </p>
                )}
                <div className="flex justify-end mt-auto">
                    <div className="text-zinc-600 group-hover:text-yellow-400 group-hover:translate-x-2 transition-all duration-500 ease-out">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <polyline points="15 5 22 12 15 19" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default function RelatedBlogs({ blogs = [] }) {

    return (
        <div className="w-full max-w-5xl mt-24 pt-16 pb-12">
            <div className="flex items-center gap-4 mb-10 px-4">
                <h2 className="text-white text-base uppercase tracking-[0.3em] font-bold">Related Blogs</h2>
                <div className="h-px bg-zinc-800 flex-grow" />
            </div>

            {blogs && blogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-4">
                    {blogs.map((blog) => (
                        <BlogCard key={blog.id} blog={blog} />
                    ))}
                </div>
            ) : (
                <div className="px-4 text-zinc-500 font-light tracking-widest uppercase text-sm">
                    No related blogs yet.
                </div>
            )}

            {/*<div className="mt-16 flex justify-center">
                <Link
                    href="/blogs"
                    className="px-8 py-3 border border-zinc-800 text-zinc-400 hover:border-yellow-400 hover:text-yellow-400 transition-all duration-300 uppercase text-xs tracking-[0.2em] font-medium"
                >
                    View All Blogs
                </Link>
            </div>*/}
        </div>
    );
}
