"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../../prismicio";
import * as prismic from "@prismicio/client";

// Utility to clean non-breaking spaces from text
const cleanText = (text) => {
    if (typeof text !== 'string') return text;
    return text.replace(/\u00A0/g, ' ');
};

export default function CaseStudyList({ initialCaseStudies, initialTotalPages }) {
    const [caseStudies, setCaseStudies] = useState(initialCaseStudies);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(initialTotalPages);
    const [loading, setLoading] = useState(false);

    const loadMore = async () => {
        if (loading || page >= totalPages) return;
        setLoading(true);
        const nextPage = page + 1;

        try {
            const response = await client.get({
                predicates: [prismic.predicate.at("document.type", "case_studies")],
                orderings: [{ field: "document.last_publication_date", direction: "desc" }],
                pageSize: 6,
                page: nextPage,
            });

         const newCaseStudies = response.results.map((c) => ({
    id: c.id,
    uid: c.uid,
    title: cleanText(prismic.asText(c.data.title) || "Untitled"),
    summary: cleanText(prismic.asText(c.data.summary) || ""),
    image: c.data.image?.url,
}));

            if (newCaseStudies.length > 0) {
                setCaseStudies((prev) => [...prev, ...newCaseStudies]);
                setPage(nextPage);
                setTotalPages(response.total_pages);
            }
        } catch (error) {
            console.error("Error fetching more case studies:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="max-w-6xl mx-auto px-6 py-16">
            {caseStudies.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-16">
                    <h3 className="text-white text-xl mt-6">Nothing to display here yet. </h3>
                    <p className="text-gray-400 mt-2">Explore again soon for our project highlights</p>
                </div>
            ) : (
                <>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {caseStudies.map((cs, i) => (
                            <div
                                key={`${cs.id}-${i}`}
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
                                        {cs?.summary.slice(0, 120)}...
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

                    {page < totalPages && (
                        <div className="flex justify-center mt-12">
                            <button
                                onClick={loadMore}
                                disabled={loading}
                                className="px-6 py-3 bg-[#FCD901] text-black font-semibold rounded-full hover:bg-[#FFE63D] transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Loading..." : "Load More"}
                            </button>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}
