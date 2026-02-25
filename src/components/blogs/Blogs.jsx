"use client";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../../prismicio";
import * as prismic from "@prismicio/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Default items per page
const ITEMS_PER_PAGE = 6;

// Utility to clean non-breaking spaces from text
const cleanText = (text) => {
    if (typeof text !== 'string') return text;
    return text.replace(/\u00A0/g, ' ');
};

export default function BlogsPage() {
    const searchParams = useSearchParams();
    const currentPage = parseInt(searchParams.get("page") || "1");

    const [blogs, setBlogs] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await client.get({
                    predicates: [prismic.predicate.at("document.type", "blogs")],
                    orderings: [{ field: "document.last_publication_date", direction: "desc" }],
                    pageSize: ITEMS_PER_PAGE,
                    page: currentPage,
                });

                const fetchedBlogs = response.results.map((b) => ({
                    id: b.id,
                    uid: b.uid,
                    title: cleanText(b.data.title|| "Untitled"),
                    summary: cleanText(b.data.summary || ""),
                    image: b.data.image?.url,
                    last_publication_date: b.last_publication_date,
                }));

                setBlogs(fetchedBlogs);
                setTotalPages(response.total_pages);
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage]);

    if (loading) {
        return (
            <section className="relative z-20 max-w-6xl mx-auto px-6 py-16 text-center">
                <p className="text-white">Loading...</p>
            </section>
        );
    }

    return (
        <section className="relative z-20 max-w-6xl mx-auto px-6 py-16">
            {blogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-16">
                    <h2 className="text-white text-xl mt-6">No posts yet,</h2>
                    <p className="text-gray-400 mt-2">
                        but exciting articles are on the way. Keep an eye out!
                    </p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {blogs.map((blog, i) => (
                        <div
                            key={i}
                            className="flex flex-col justify-between rounded-xl p-6 bg-gradient-to-br from-[#1A1A1A] to-[#000000] border border-[#FCD901]/30 transition duration-300 hover:shadow-lg hover:shadow-[#FCD901]/40 h-full"
                        >
                            <div className="flex flex-col gap-1">
                                {blog.image && (
                                    <Link
                                        href={`/blogs/${blog.uid}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Go to blog: ${blog.title}`}
                                    >
                                        <Image
                                            src={blog.image}
                                            alt={blog.title}
                                            width={600}
                                            height={400}
                                            className="w-full h-56 object-cover rounded-2xl cursor-pointer"
                                        />
                                    </Link>
                                )}
                                <h4 className="font-semibold text-lg sm:text-xl text-white leading-tight mt-4 break-words">
                                    <Link
                                        href={`/blogs/${blog.uid}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-left"
                                        aria-label={`Go to blog: ${blog.title}`}
                                    >
                                        {blog.title}
                                    </Link>
                                </h4>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-3 break-words">
                                    {blog.summary.slice(0, 120)}...
                                </p>
                            </div>

                            <div className="mt-auto w-fit">
                                <Link
                                    href={`/blogs/${blog.uid}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block w-full text-center text-sm font-medium text-black bg-[#FCD901] px-3 py-2 rounded-md hover:bg-[#FFE63D] transition"
                                    aria-label={`Read more about ${blog.title}`}
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="relative z-30 flex items-center justify-center gap-4 mt-8 pointer-events-auto">
                    <Link
                        href={`/blogs?page=${currentPage - 1}`}
                        scroll={false}
                        className={`text-white rounded ${currentPage === 1 ? "opacity-50 pointer-events-none" : ""}`}
                        aria-disabled={currentPage === 1}
                    >
                        Prev
                    </Link>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <Link
                            key={i}
                            href={`/blogs?page=${i + 1}`}
                            scroll={false}
                            className={`px-4 py-2 rounded-full transition-all ${currentPage === i + 1
                                ? "bg-[#FCD901] text-black"
                                : "bg-gray-700 text-white hover:bg-gray-600"
                                }`}
                            aria-current={currentPage === i + 1 ? "page" : undefined}
                        >
                            {i + 1}
                        </Link>
                    ))}

                    <Link
                        href={`/blogs?page=${currentPage + 1}`}
                        scroll={false}
                        className={`text-white rounded ${currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}`}
                        aria-disabled={currentPage === totalPages}
                    >
                        Next
                    </Link>
                </div>
            )}
        </section>
    );
}
