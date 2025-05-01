"use client";

import { useGet1mgMedicine, useGetPharmeasyMedicine } from "@/store/queries";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ComparisonResults } from "./compare";
import { Header } from "@/components/ui/header";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState("");

  const { data, isLoading } = useGet1mgMedicine(query);
  const { data: data2, isLoading: isLoading2 } = useGetPharmeasyMedicine(query);
  console.log(searchQuery);
  const handleSearch = () => {
    if (searchQuery.trim()) {
      setQuery(searchQuery);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <Header />
        </header>

        {/* search bar */}
        <div className="bg-transparent p-6 mb-10 ">
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-200" /> */}

              <div className="relative w-full max-w-xl mx-auto bg-white rounded-full">
                <input
                  className="rounded-full w-full h-16 bg-transparent py-2 pl-8 pr-32 outline-none border-2 border-gray-100 shadow-md hover:outline-none focus:ring-teal-200 focus:border-teal-200"
                  type="text"
                  name="query"
                  id="query"
                  placeholder="Search for medicines (e.g., Dolo, Crocin, etc.)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  onClick={handleSearch}
                  className="absolute inline-flex items-center h-10 px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-full outline-none right-3 top-3 bg-teal-600 sm:px-6 sm:text-base sm:font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  <svg
                    className="-ml-0.5 sm:-ml-1 mr-2 w-4 h-4 sm:h-5 sm:w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                  Search
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <p className="flex items-center text-lg font-medium text-gray-700 ">
              Popular searches:
            </p>
            {[
              "Dolo 650",
              "Crocin",
              "Azithromycin",
              "Montair LC",
              "Vitamin D3",
            ].map((term, index) => (
              <Badge
                key={term}
                className="px-4 py-2 bg-[#f6f7f7] rounded-full text-textcolor text-sm font-medium whitespace-nowrap transition-all duration-200 hover:bg-teal-100 hover:text-teal-700 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => {
                  setSearchQuery(term);
                  setQuery(term);
                }}
              >
                {term}
              </Badge>
            ))}
          </div>
        </div>

        {/* comparison results */}
        <ComparisonResults
          userQuery={searchQuery}
          data={data}
          data2={data2}
          isLoading={isLoading}
          isLoading2={isLoading2}
        />
      </div>
    </main>
  );
}
