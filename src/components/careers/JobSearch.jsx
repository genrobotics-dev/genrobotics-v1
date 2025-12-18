"use client";
import React, { useState, useEffect } from "react";
import JobSearchForm from "./JobSearchForm";
import JobList from "./JobList";

const JobSearch = () => {
  const [filteredJobs, setFilteredJobs] = useState(undefined);
  const [loading, setLoading] = useState(true);
  // Track loading based on whether jobs have been received
  useEffect(() => {
    if (filteredJobs !== undefined) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [filteredJobs]);

  return (
    <section className="relative section py-24 z-40">
      <h2 className="font-anton text-white text-center">
        Begin Your Search{" "}
        <span className="text-[#FCD901] block md:inline">
          For Greater Opportunities
        </span>
      </h2>
      <JobSearchForm onSearch={setFilteredJobs} />
      {loading ? (
        <div className="flex flex-col items-center justify-center text-center py-16">
          <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-[#FCD901] border-opacity-50 mb-4"></div>
          <h2 className="text-white text-xl mt-6">Loading roles...</h2>
          <p className="text-gray-400 mt-2">
            Please wait while we fetch the latest job openings for you.
          </p>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-16">
          <h2 className="text-white text-xl mt-6">
            No open roles at the moment.
          </h2>
          <p className="text-gray-400 mt-2">
            We encourage you to check back soon or explore other categories that may align with your interests.
          </p>
        </div>
      ) : (
        <JobList jobs={filteredJobs} itemsPerPage={6} />
      )}
      {/* Map */}
      {/* <div className="mt-24 lg:w-1/2 aspect-square md:aspect-video mx-auto">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.417846033399!2d76.87872427526023!3d8.555757191487888!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05befaeabb885f%3A0x486c83afdd2a6d65!2sGenrobotic%20Innovations%20Pvt.%20Ltd.!5e0!3m2!1sen!2sin!4v1751174302919!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: "0" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div> */}
    </section>
  );
};

export default JobSearch;
