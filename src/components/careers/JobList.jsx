"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const JobList = ({ jobs, itemsPerPage = 6 }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page when jobs list changes (e.g. new search)
  useEffect(() => {
    setCurrentPage(1);
  }, [jobs]);
  const totalPages = Math.ceil(jobs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentJobs = jobs.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Mobile-only ellipsis pagination
  const getMobilePages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) pages.push(1, 2, 3, '...', totalPages);
      else if (currentPage >= totalPages - 2) pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      else pages.push(1, '...', currentPage, '...', totalPages);
    }
    return pages;
  };

  return (
    <>
      {/* Job Cards Grid */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentJobs.map((job) => (
          <div
            key={job.id}
            className="flex flex-col justify-between rounded-xl p-6 bg-gradient-to-br from-[#1A1A1A] to-[#000000] border border-[#FCD901]/30 transition duration-300 hover:shadow-lg hover:shadow-[#FCD901]/40 h-full"
          >
            <div className="flex flex-col gap-1">
              <h3 className="font-semibold text-lg sm:text-xl text-[#FCD901] group-hover:text-white transition">
                {job.title}
              </h3>
              <p className="text-gray-400 text-sm">{job.location || "Location not specified"}</p>
              <p className="text-gray-400 text-sm mb-4">{job.department_name || "Department not available"}</p>
            </div>

            <div className="mt-auto w-fit">
              <Link
                href={job.apply_link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center text-sm font-medium text-black bg-[#FCD901] px-3 py-2 rounded-md hover:bg-[#FFE63D] transition"
              >
                Apply Now →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-1 px-2">
          {/* Prev Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded border border-gray-400 text-gray-400 disabled:opacity-50"
          >
            Prev
          </button>

          {/* Desktop / Tablet: show full page numbers */}
          <div className="hidden sm:flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded border text-sm ${currentPage === page
                    ? "bg-[#FCD901] text-black border-[#FCD901]"
                    : "text-gray-400 border-gray-400"
                  }`}
              >
                {page}
              </button>
            ))}
          </div>

          {/* Mobile: ellipsis pagination */}
          <div className="flex sm:hidden gap-1">
            {getMobilePages().map((page, idx) =>
              page === '...' ? (
                <span key={idx} className="px-2 py-1 text-gray-400">…</span>
              ) : (
                <button
                  key={idx}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded border text-sm ${currentPage === page
                      ? "bg-[#FCD901] text-black border-[#FCD901]"
                      : "text-gray-400 border-gray-400"
                    }`}
                >
                  {page}
                </button>
              )
            )}
          </div>

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded border border-gray-400 text-gray-400 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default JobList;
