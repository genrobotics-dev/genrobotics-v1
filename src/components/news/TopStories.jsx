"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { client } from "../../../prismicio";
import * as prismic from "@prismicio/client";

const TopStories = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchFeaturedArticles() {
      try {
        const response = await client.getAllByType("articles", {
          filters: [prismic.filter.at("my.articles.featured", true)],
          orderings: [
            { field: "my.articles.date", direction: "desc" },
          ],
        });

        setArticles(response);
      } catch (err) {
        console.error("Error fetching featured articles:", err);
      }
    }

    fetchFeaturedArticles();
  }, []);

  return (
    <section className="relative py-8 sm:py-12 space-y-6 sm:space-y-8 section px-4 sm:px-6">
      <h2 className="font-anton text-white text-2xl sm:text-3xl md:text-4xl">
        Top <span className="text-[#FCD901]">Stories</span>
      </h2>

      {/* Horizontal scroll container */}
      <div className="flex gap-4 sm:gap-6 overflow-x-auto overflow-y-hidden scrollbar-custom pb-4 sm:pb-6 snap-x snap-mandatory">
        {articles.length === 0 ? (
          <p className="text-gray-400 text-sm sm:text-base">No featured articles available.</p>
        ) : (
          articles.map((item, i) => {
            const article = item.data;
            const formattedDate = new Date(
              article.date
            ).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            });
console.log(article);

            return (
              <div
                key={i}
                className="
                  flex flex-col space-y-3 sm:space-y-4 shrink-0 snap-start rounded-lg 
                  bg-gradient-to-b from-white/5 to-white/0 p-3 sm:p-4 hover:bg-white/10 transition-all
                  w-[280px] sm:w-[320px] md:w-[350px] lg:w-[300px]
                "
              >
                {article.article_image?.url && (
                  <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                    <Image
                      src={article.article_image?.url}
                      alt={article.article_image.alt || article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="flex flex-col flex-grow">
                  <h4 className="text-white leading-5 sm:leading-6 lg:leading-relaxed text-sm sm:text-base lg:text-lg font-semibold line-clamp-3">
                    {article.article_title}
                  </h4>
                  <div className="flex gap-2 items-center mt-2">
                    <Image
                      src="/news/clock.svg"
                      alt="clock"
                      width={14}
                      height={14}
                      className="sm:w-4 sm:h-4"
                    />
                    <p className="text-white font-thin text-xs sm:text-sm">
                      {formattedDate}
                    </p>
                  </div>
                </div>

                {article.link_to_article?.url && (
                  <div className="mt-auto pt-2">
                    <Link
                      href={article.link_to_article.url}
                      target="_blank"
                      aria-describedby={`new-window-${article.id}`}
                      className="bg-[#FCD901] px-3 sm:px-4 py-1 sm:py-1.5 rounded text-black font-medium hover:bg-yellow-400 transition inline-block text-xs sm:text-sm"
                    >
                      Read More
                    </Link>
                    <span id={`new-window-${article.id}`} className="sr-only">Opens in new window</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
};

export default TopStories;
