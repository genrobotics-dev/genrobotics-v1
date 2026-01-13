"use client";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../../prismicio";
import * as prismic from "@prismicio/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ITEMS_PER_PAGE = 6;

// Utility to clean non-breaking spaces from text
const cleanText = (text) => {
    if (typeof text !== 'string') return text;
    return text.replace(/\u00A0/g, ' ');
};

export default function CaseStudiesPage() {
    const searchParams = useSearchParams();
    const currentPage = parseInt(searchParams.get("page") || "1");

    const [caseStudies, setCaseStudies] = useState([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await client.get({
                    predicates: [prismic.predicate.at("document.type", "case_studies")],
                    orderings: [{ field: "document.last_publication_date", direction: "desc" }],
                    pageSize: ITEMS_PER_PAGE,
                    page: currentPage,
                });

                const fetchedStudies = response.results.map((c) => ({
                    id: c.id,
                    uid: c.uid,
                    title: cleanText(c.data.title[0]?.text || "Untitled"),
                    summary: cleanText(c.data.summary || ""),
                    image: c.data.image?.url,
                }));

                setCaseStudies(fetchedStudies);
                setTotalPages(response.total_pages);
            } catch (error) {
                console.error("Failed to fetch case studies:", error);
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
            {caseStudies.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-16">
                    <h3 className="text-white text-xl mt-6">Nothing to display here yet. </h3>
                    <p className="text-gray-400 mt-2">Explore again soon for our project highlights</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {caseStudies.map((cs) => (
                        <div
                            key={cs.id}
                            className="flex flex-col justify-between rounded-xl p-6 bg-gradient-to-br from-[#1A1A1A] to-[#000000] border border-[#FCD901]/30 transition duration-300 hover:shadow-lg hover:shadow-[#FCD901]/40 h-full"
                        >
                            <div className="flex flex-col gap-1">
                                {cs.image && (
                                    <Link
                                        href={`/case-study/${cs.uid}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`Go to case study: ${cs.title}`}
                                    >
                                        <Image
                                            src={cs.image}
                                            alt={cs.title}
                                            width={600}
                                            height={400}
                                            className="w-full h-56 object-cover rounded-2xl cursor-pointer"
                                        />
                                    </Link>
                                )}
                                <h4 className="font-semibold text-lg sm:text-xl text-white leading-tight mt-4">
                                    <Link
                                        href={`/case-study/${cs.uid}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-left"
                                        aria-label={`Go to case study: ${cs.title}`}
                                    >
                                        {cs.title}
                                    </Link>
                                </h4>
                                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                    {cs.summary.slice(0, 120)}...
                                </p>
                            </div>

                            <div className="mt-auto w-fit">
                                <Link
                                    href={`/case-study/${cs.uid}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block w-full text-center text-sm font-medium text-black bg-[#FCD901] px-3 py-2 rounded-md hover:bg-[#FFE63D] transition"
                                    aria-label={`Read more about ${cs.title}`}
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
                        href={`/case-study?page=${currentPage - 1}`}
                        scroll={false}
                        className={`text-white rounded ${currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                            }`}
                        aria-disabled={currentPage === 1}
                    >
                        Prev
                    </Link>

                    {Array.from({ length: totalPages }, (_, i) => (
                        <Link
                            key={i}
                            href={`/case-study?page=${i + 1}`}
                            scroll={false}
                            className={`px-4 py-2 rounded-full transition-all ${currentPage === i + 1 ? "bg-[#FCD901] text-black" : "bg-gray-700 text-white hover:bg-gray-600"
                                }`}
                            aria-current={currentPage === i + 1 ? "page" : undefined}
                        >
                            {i + 1}
                        </Link>
                    ))}

                    <Link
                        href={`/case-study?page=${currentPage + 1}`}
                        scroll={false}
                        className={`text-white rounded ${currentPage === totalPages ? "opacity-50 pointer-events-none" : ""
                            }`}
                        aria-disabled={currentPage === totalPages}
                    >
                        Next
                    </Link>
                </div>
            )}
        </section>
    );
}
