"use client";
import React, { useEffect, useState } from "react";

const JobSearchForm = ({ onSearch }) => {
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMore, setShowMore] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");

  const BASE_URL = process.env.NEXT_PUBLIC_PYJAMAHR_API_BASEURL;
  const TOKEN = process.env.NEXT_PUBLIC_PYJAMAHR_API_TOKEN;
  
  // Fetch all jobs (with pagination) at the initial render
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        let results = [];
        let url = `${BASE_URL}/jobs/`;

        while (url) {
          const res = await fetch(url, {
            headers: {
              Authorization: `Token ${TOKEN}`,
            },
          });
          const data = await res.json();
          results = [...results, ...data.results];
          url = data.next;
        }
        setAllJobs(results);
        // Call onSearch with all jobs on initial render
        onSearch(results);
      } catch (err) {
        console.error("❌ Failed to fetch jobs:", err);
        setAllJobs([]);
        onSearch([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
    // We want to run this only on initial render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const departments = [...new Set(allJobs.map((j) => j.department_name).filter(Boolean))];
  const roles = [...new Set(allJobs.map((j) => j.title).filter(Boolean))];
  const locations = [...new Set(allJobs.map((j) => j.location).filter(Boolean))];

  const handleSearch = (e) => {
    e.preventDefault();

    const filtered = allJobs.filter((job) => {
      const matchKeyword =
        !keyword ||
        job.title?.toLowerCase().includes(keyword.toLowerCase()) ||
        job.department_name?.toLowerCase().includes(keyword.toLowerCase());

      const matchLocation =
        !location || job.location?.toLowerCase().includes(location.toLowerCase());

      const matchDepartment =
        !department ||
        job.department_name?.toLowerCase() === department.toLowerCase();

      const matchRole =
        !role || job.title?.toLowerCase().includes(role.toLowerCase());

      return matchKeyword && matchLocation && matchDepartment && matchRole;
    });

    onSearch(filtered); // pass results to parent
  };

  const handleClear = () => {
    setKeyword("");
    setLocation("");
    setDepartment("");
    setRole("");
    onSearch(allJobs); // show all jobs on clear
  };

  return (
    <form
      onSubmit={handleSearch}
      className="mt-12 bg-gradient-to-r from-black/0 to-[#FCD901]/15 rounded-lg"
    >
      <div className="flex flex-col md:flex-row gap-8 p-4 lg:p-8">
        <div className="flex-10 w-full">
          {/* Top fields */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 space-y-2">
            <div className="flex-1 space-y-2">
              <label className="text-white block">Search by Keyword</label>
              <input
                className="bg-white w-full rounded px-2 py-1"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="e.g. Engineer, Marketing..."
              />
            </div>
            <div className="flex-1 space-y-2 relative">
              <label className="text-white block">Search by Location</label>
              <input
                className="bg-white w-full rounded px-2 py-1"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Type location"
              />
              {location && (
                <ul className="absolute bg-white border mt-1 rounded-md shadow z-10 max-h-40 overflow-y-auto w-full">
                  {locations
                    .filter((loc) =>
                      loc.toLowerCase().includes(location.toLowerCase())
                    )
                    .map((loc, i) => (
                      <li
                        key={i}
                        onClick={() => setLocation(loc)}
                        className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {loc}
                      </li>
                    ))}
                </ul>
              )}
            </div>
          </div>

          {/* Toggle more filters */}
          <p
            className="text-gray-400 text-xs cursor-pointer mt-4 md:mt-0"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? "Hide Options" : "Show More Options"}
          </p>

          {/* More filters */}
          <div className={showMore ? "mt-4" : "hidden"}>
            <hr className="mb-8 h-px border-0 bg-white/20" />
            <div className="flex flex-col md:flex-row gap-4 md:gap-8">
              <div className="flex-1 space-y-2">
                <label className="text-white block">Department</label>
                <select
                  className="bg-white w-full rounded px-2 py-1"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="">All Departments</option>
                  {departments.map((d, i) => (
                    <option key={i} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-white block">Role</label>
                <select
                  className="bg-white w-full rounded px-2 py-1"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">All Roles</option>
                  {roles.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex-2 flex flex-col justify-start mt-4 md:mt-6">
          <button
            type="submit"
            className="text-[#FCD901] px-3 py-2 bg-black rounded-lg cursor-pointer"
          >
            {loading ? "Loading..." : "Search Jobs"}
          </button>
          <p
            className="text-gray-400 text-xs mt-2 cursor-pointer"
            onClick={handleClear}
          >
            Clear
          </p>
        </div>
      </div>
    </form>
  );
};

export default JobSearchForm;
