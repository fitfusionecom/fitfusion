"use client";

import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";

type Blog = {
  id: string;
  title: string;
  subtitle?: string;
  cover_image?: string;
  author_name: string;
  tags?: string[];
  published_at?: string | null;
  slug: string;
};

type BlogListProps = {
  initialBlogs?: Blog[];
  totalCount?: number;
};

export default function BlogList({
  initialBlogs = [],
  totalCount = 0,
}: BlogListProps) {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(totalCount / 10));

  const fetchBlogs = async (page: number = 1) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/blogs`);
      const data = await response.json();

      setBlogs(data.blogs);
      setTotalPages(Math.ceil(data.count / 10));
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialBlogs.length === 0) {
      fetchBlogs();
    }
  }, []);

  const handlePageChange = (page: number) => {
    fetchBlogs(page);
  };

  if (isLoading && blogs.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Blog grid */}
      {blogs.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 py-14 text-center">
          <p className="text-gray-500 text-lg">No blogs found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mb-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 rounded-full border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 rounded-full text-sm border ${currentPage === page
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300 hover:bg-gray-50"
                }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 rounded-full border border-gray-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
