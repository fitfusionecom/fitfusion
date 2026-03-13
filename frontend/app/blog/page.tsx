import { Metadata } from "next";
import { getBlogs } from "@/lib/data/product";
import BlogList from "@/components/blog/BlogList";



export const metadata: Metadata = {
  title: "Our Blog",
  description: "Discover insights, tips, and stories from our team and community. Stay updated with the latest trends and valuable content.",
}

export default async function BlogPage() {
  const { blogs, count } = await getBlogs();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blogs</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover insights, tips, and stories from our team and community.
              Stay updated with the latest trends and valuable content.
            </p>
          </div>
        </div>
      </div>

      <div className="py-12">
        <BlogList initialBlogs={blogs} totalCount={count} />
      </div>
    </div>
  );
}
