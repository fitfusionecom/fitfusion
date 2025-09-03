"use client";

import { useState, useEffect } from "react";
import BlogCard from "./BlogCard";
import { FaSearch, FaFilter } from "react-icons/fa";

type Blog = {
  id: string;
  title: string;
  subtitle?: string;
  cover_image?: string;
  author_name: string;
  tags?: string[];
  published_at: string;
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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(Math.ceil(totalCount / 10));

  const fetchBlogs = async (
    page: number = 1,
    search?: string,
    tag?: string,
    author?: string
  ) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        limit: "10",
        offset: ((page - 1) * 10).toString(),
      });

      if (search) params.append("search", search);
      if (tag) params.append("tag", tag);
      if (author) params.append("author", author);

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

  const handleSearch = () => {
    setCurrentPage(1);
    fetchBlogs(1, searchTerm, selectedTag, selectedAuthor);
  };

  const handleTagFilter = (tag: string) => {
    setSelectedTag(tag === selectedTag ? "" : tag);
    setCurrentPage(1);
    fetchBlogs(1, searchTerm, tag === selectedTag ? "" : tag, selectedAuthor);
  };

  const handleAuthorFilter = (author: string) => {
    setSelectedAuthor(author === selectedAuthor ? "" : author);
    setCurrentPage(1);
    fetchBlogs(
      1,
      searchTerm,
      selectedTag,
      author === selectedAuthor ? "" : author
    );
  };

  const handlePageChange = (page: number) => {
    fetchBlogs(page, searchTerm, selectedTag, selectedAuthor);
  };

  // Get unique tags and authors from blogs
  const allTags = Array.from(new Set(blogs.flatMap((blog) => blog.tags || [])));
  const allAuthors = Array.from(new Set(blogs.map((blog) => blog.author_name)));

  if (isLoading && blogs.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search blogs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
          </div>
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>

        {/* Tag and Author Filters */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Tags:</span>
          </div>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagFilter(tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedTag === tag
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <FaFilter className="text-gray-400" />
            <span className="text-sm font-medium text-gray-700">Authors:</span>
          </div>
          {allAuthors.map((author) => (
            <button
              key={author}
              onClick={() => handleAuthorFilter(author)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedAuthor === author
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {author}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Grid */}
      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No blogs found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mb-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 border rounded-lg ${
                currentPage === page
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
            className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
