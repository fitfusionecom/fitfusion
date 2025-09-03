"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowLeft, FaCalendar, FaUser, FaTags } from "react-icons/fa";

type Blog = {
  id: string;
  title: string;
  subtitle?: string;
  cover_image?: string;
  content: string;
  author_name: string;
  tags?: string[];
  published_at: string;
  slug: string;
};

type BlogDetailProps = {
  slug: string;
};

export default function BlogDetail({ slug }: BlogDetailProps) {
  const [blog, setBlog] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${slug}`);
        if (!response.ok) {
          throw new Error("Blog not found");
        }
        const data = await response.json();
        setBlog(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch blog");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          {error || "Blog not found"}
        </h1>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaArrowLeft />
          Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <FaArrowLeft />
          Back to Blogs
        </Link>
      </div>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {blog.title}
        </h1>
        
        {blog.subtitle && (
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {blog.subtitle}
          </p>
        )}

        {/* Meta Information */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-b border-gray-200 pb-6">
          <div className="flex items-center gap-2">
            <FaUser className="text-gray-400" />
            <span>By {blog.author_name}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <FaCalendar className="text-gray-400" />
            <time dateTime={blog.published_at}>
              {formatDate(blog.published_at)}
            </time>
          </div>
          
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex items-center gap-2">
              <FaTags className="text-gray-400" />
              <div className="flex gap-2">
                {blog.tags.map((tag, index) => (
                  <Link
                    key={index}
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium hover:bg-blue-200 transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Cover Image */}
      {blog.cover_image && (
        <div className="mb-8">
          <div className="relative h-96 w-full rounded-lg overflow-hidden">
            <Image
              src={blog.cover_image}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
          {blog.content}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="text-sm text-gray-500">
            <p>Written by {blog.author_name}</p>
            <p>Published on {formatDate(blog.published_at)}</p>
          </div>
          
          <div className="flex gap-2">
            <Link
              href="/blog"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              View All Blogs
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
}
