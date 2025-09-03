import Link from "next/link";
import Image from "next/image";

type BlogCardProps = {
  blog: {
    id: string;
    title: string;
    subtitle?: string;
    cover_image?: string;
    author_name: string;
    tags?: string[];
    published_at: string;
    slug: string;
  };
};

export default function BlogCard({ blog }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {blog.cover_image && (
        <div className="relative h-48 w-full">
          <Image
            src={blog.cover_image}
            alt={blog.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          {blog.tags && blog.tags.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          <Link href={`/blog/${blog.slug}`} className="hover:text-blue-600">
            {blog.title}
          </Link>
        </h3>
        
        {blog.subtitle && (
          <p className="text-gray-600 mb-4 line-clamp-2">{blog.subtitle}</p>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>By {blog.author_name}</span>
          <time dateTime={blog.published_at}>
            {formatDate(blog.published_at)}
          </time>
        </div>
      </div>
    </article>
  );
}
