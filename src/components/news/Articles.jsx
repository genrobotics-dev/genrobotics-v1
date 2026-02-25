"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { client } from "../../../prismicio";
import * as prismic from "@prismicio/client";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 8;

  const fetchArticles = async (page = 1) => {
    try {
      // Fetch articles from Prismic
      const response = await client.get({
        predicates: [prismic.predicate.at("document.type", "articles")],
        orderings: [{ field: "my.articles.date", direction: "desc" }],
        pageSize: itemsPerPage,
        page,
      });
      
      // Map data for UI
      const formatted = response.results.map((a) => ({
        heading: a.data.article_title || "Untitled",
        image: a.data.article_image?.url,
        date: a.data.date
          ? new Date(a.data.date).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })
          : "",
        link: a.data?.link_to_article?.url || null,
      }));

      setArticles(formatted);
      setTotalPages(response.total_pages);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setArticles([]);
      setTotalPages(1);
    }
  };

  useEffect(() => {
    fetchArticles(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <section className="relative z-20 py-8 sm:py-12 space-y-6 sm:space-y-8 section px-4 sm:px-6">
      <h2 className="font-anton text-white text-2xl sm:text-3xl md:text-4xl">
        Latest <span className="text-[#FCD901]">Coverage</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
        {articles.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center text-center py-16">
            <h2 className="text-white text-lg sm:text-xl mt-6">
              The latest happenings are on their way.{" "}
            </h2>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">
              Check back soon for updates
            </p>
          </div>
        ) : (
          articles.map((item, i) => (
            <div key={i} className="space-y-3 sm:space-y-4 flex flex-col justify-between h-full">
              {item.image && (
                <div className="relative w-full aspect-[4/3]">
                  <Image
                    src={item.image}
                    alt={item.heading}
                    fill
                    className="rounded-lg object-cover"
                  />
                </div>
              )}
              <div className="flex-grow">
                <h4 className="text-white leading-5 sm:leading-6 lg:leading-relaxed text-sm sm:text-base lg:text-lg font-medium line-clamp-3">
                  {item.heading}
                </h4>
                <div className="flex gap-2 items-center mt-2">
                  <Image
                    src="/news/clock.svg"
                    alt="clock"
                    width={16}
                    height={16}
                    className="sm:w-5 sm:h-5"
                  />
                  <p className="text-white font-thin text-xs sm:text-sm">{item.date}</p>
                </div>
              </div>
              <div className="mt-3 sm:mt-4">
                {item.link ? (
                  <Link
                    href={item.link}
                    target="_blank"
                    aria-label={`Read more about ${item.heading}`}
                    className="bg-[#FCD901] px-3 sm:px-4 py-1 sm:py-1.5 rounded text-black font-medium hover:bg-yellow-400 transition text-xs sm:text-sm"
                  >
                    Read More
                  </Link>
                ) : (
                  <span
                    aria-disabled
                    className="bg-gray-600 px-3 sm:px-4 py-1 sm:py-1.5 rounded text-white font-medium text-xs sm:text-sm"
                    title="Link unavailable"
                  >
                    Read More
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className="relative z-30 flex items-center justify-center gap-2 sm:gap-4 mt-6 sm:mt-8 pointer-events-auto">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-white rounded disabled:opacity-50 text-sm sm:text-base px-2 sm:px-3 py-1 sm:py-2"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full cursor-pointer text-xs sm:text-sm ${currentPage === i + 1
                ? "bg-[#FCD901] text-black"
                : "bg-gray-700 text-white"
                }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="text-white rounded disabled:opacity-50 text-sm sm:text-base px-2 sm:px-3 py-1 sm:py-2"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default Articles;
