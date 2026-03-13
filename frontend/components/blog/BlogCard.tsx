import Link from "next/link";

type BlogCardProps = {
  blog: any;
};

export default function BlogCard({ blog }: BlogCardProps) {


  return (
    <article className="flex flex-col h-full bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 border">


      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5 lg:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
          <Link href={`/blog/${blog.slug}`} className="hover:text-blue-600 transition-colors">
            {blog.title}
          </Link>
        </h3>

        {blog.subtitle && (
          <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3">
            {blog.subtitle}
          </p>
        )}

        <div className="mt-auto flex items-center justify-between text-xs sm:text-sm text-gray-500 gap-2">
          <span className="truncate">
            By <span className="font-semibold text-gray-700">{blog.author_name}</span>
          </span>

        </div>
      </div>
    </article>
  );
}
