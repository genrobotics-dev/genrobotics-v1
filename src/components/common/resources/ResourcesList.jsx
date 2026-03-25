"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { asText } from '@prismicio/client';
import Pagination from '../Pagination';
import CustomSlider from '../CustomSlider';

export const renderCard = (item, isFeatured = false, showDate = false, showSummary = true) => {
    const isPrismic = !!item.data;
    const title = isPrismic ? (item.data.seo_title || item.data.title || item.data.article_title || "Untitled") : item.title;
    const summarySource = item.data?.summary || item.data?.content || item.data?.contents || "";
    const summary = isPrismic ? (
        (typeof summarySource === 'string' ? summarySource : asText(summarySource)) || "Click to read more about this resource."
    ) : item.summary;
    const imageUrl = isPrismic ? (item.data.image?.url || item.data.article_image?.url || "/placeholder.jpg") : item.image;
    const altText = isPrismic ? (item.data.image?.alt || item.data.article_image?.alt || title) : title;
    const dateString = item.first_publication_date || item.last_publication_date || (isPrismic ? item.data?.date : item.date);
    const publisher = isPrismic ? (item.data.publisher || null) : null;

    const typeForUrl = item.type?.replace(/_/g, '-');
    const getDetailLink = () => {
        if (item.link) return item.link; // Mock data link

        if (isPrismic) {
            // Check common Prismic link fields for external news sources
            const linkField = item.data.link || item.data.article_link || item.data.external_link || item.data.link_url || item.data.link_to_article;
            if (linkField && (linkField.url || typeof linkField === 'string')) {
                return linkField.url || linkField;
            }

            // For news-related types, we want them under /news/ path
            if (item.type === 'articles' || item.type === 'news' || item.type === 'news_media') {
                return `/news/${item.uid}`;
            }
        }

        return `/${typeForUrl}/${item.uid}`;
    };

    const detailLink = getDetailLink();
    const isExternal = String(detailLink).startsWith('http');

    const formatDate = (date) => {
        if (!date) return null;
        return new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        }).format(new Date(date));
    };

    return (
        <Link
            key={item.id}
            href={detailLink}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className={`bg-[#0a0a0a] group border border-zinc-900 hover:border-yellow-400/30 transition-all duration-500 flex flex-col h-full rounded-none overflow-hidden ${isFeatured ? 'border-yellow-400/20' : ''}`}
        >
            {/* Image Section */}
            <div className="relative aspect-video w-full overflow-hidden group-hover:grayscale-0 transition-all duration-700">
                <Image
                    src={imageUrl}
                    alt={altText}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                {isFeatured && (
                    <div className="absolute top-4 left-4 bg-yellow-400 text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1">
                        Top Story
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="pt-6 px-5 pb-5 md:pt-8 md:px-8 md:pb-6 flex flex-col grow">
                {showDate && dateString && (
                    <div className="text-yellow-400/60 text-[10px] uppercase tracking-[0.2em] font-medium mb-4">
                        {formatDate(dateString)}
                    </div>
                )}
                <h3 className="text-white text-2xl font-bold mb-4 leading-[1.15] group-hover:text-yellow-400 transition-colors duration-300 tracking-normal">
                    {title}
                </h3>
                {showSummary && (
                    <div 
                        className="text-zinc-500 text-sm mb-8 leading-relaxed font-light overflow-hidden"
                        style={{
                            display: '-webkit-box',
                            WebkitLineClamp: '3',
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                        }}
                    >
                        {summary}
                    </div>
                )}

                <div className="flex justify-between items-center mt-auto gap-4">
                    <div className="flex flex-col gap-1 min-w-0">
                        {publisher && (
                            <span className="text-zinc-500 text-[10px] uppercase tracking-[0.15em] font-medium truncate">
                                {publisher}
                            </span>
                        )}
                        <span className="text-[#FCD901] text-[10px] uppercase tracking-[0.2em] font-medium">
                            {formatDate(dateString) || " "}
                        </span>
                    </div>
                    <div className="text-zinc-600 group-hover:text-yellow-400 group-hover:translate-x-2 transition-all duration-500 ease-out shrink-0">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="2" y1="12" x2="22" y2="12"></line>
                            <polyline points="15 5 22 12 15 19"></polyline>
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default function ResourceList({ items = [], itemsPerPage = 6, featuredItems = [], showDate = false, showSummary = true }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [effectiveItemsPerPage, setEffectiveItemsPerPage] = useState(itemsPerPage);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setEffectiveItemsPerPage(4);
            } else {
                setEffectiveItemsPerPage(itemsPerPage);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [itemsPerPage]);

    const regularItems = items.filter(item => !featuredItems.find(f => f.id === item.id));

    const totalPages = Math.ceil(regularItems.length / effectiveItemsPerPage);
    const startIndex = (currentPage - 1) * effectiveItemsPerPage;
    const currentItems = regularItems.slice(startIndex, startIndex + effectiveItemsPerPage);

    if (!items || items.length === 0) {
        return (
            <div className="text-white text-center py-20 bg-black font-light tracking-widest uppercase opacity-50">
                No resources found.
            </div>
        );
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Use setTimeout to scroll after React re-renders the new page content
        setTimeout(() => {
            const element = document.getElementById('resource-card-grid');
            if (element) {
                const elementTop = element.getBoundingClientRect().top + window.scrollY;
                // 130px offset: navbar (~96px) + comfortable breathing room
                window.scrollTo({ top: elementTop - 130, behavior: 'smooth' });
            }
        }, 50);
    };

    return (
        <section id="resource-grid" className="w-full bg-black py-20 container">
            {featuredItems.length > 0 && currentPage === 1 && (
                <div className="mb-24">
                    <div className="flex items-center gap-4 mb-10">
                        <h2 className="text-white text-base uppercase tracking-[0.2em]">Top Stories</h2>
                        <div className="h-px bg-zinc-800 grow"></div>
                    </div>

                    <CustomSlider
                        items={featuredItems}
                        renderItem={(item) => renderCard(item, true, showDate, showSummary)}
                        swiperConfig={{
                            autoplay: {
                                delay: 3000,
                                disableOnInteraction: false,
                            },
                            loop: true,
                            centeredSlides: false,
                            breakpoints: {
                                640: {
                                    slidesPerView: 2,
                                    spaceBetween: 30,
                                },
                                1024: {
                                    slidesPerView: 3,
                                    spaceBetween: 40,
                                }
                            }
                        }}
                    />
                </div>
            )}

            {/* Main Listing Section */}
            <div id="resource-card-grid" className="container" style={{ scrollMarginTop: "150px" }}>
                {featuredItems.length > 0 && (
                    <div className="flex items-center gap-4 mb-10">
                        <h2 className="text-white text-base uppercase tracking-[0.2em]">Latest News</h2>
                        <div className="h-px bg-zinc-800 grow"></div>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ">
                    {currentItems.map(item => renderCard(item, false, showDate, showSummary))}
                </div>
            </div>

            {/* Pagination Controls */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={paginate}
            />
        </section>
    );
}