import { getBlogBySlug } from "@/lib/data/product";
import BlogPreview from "@/components/blog/BlogPreview";

type BlogPostPageProps = {
  params: Promise<{
    slug: string;
  }>;
};


export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blog: any = await getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
      description: "The blog post you're looking for doesn't exist."
    };
  }

  return {
    title: blog.title,
    description: blog.subtitle || "",
    openGraph: {
      title: blog.title,
      description: blog.subtitle || "",
      type: "article",
      url: `https://yourdomain.com/blog/${blog.slug}`,
      publishedTime: blog.published_at,
      modifiedTime: blog.updated_at,
      authors: blog.author_name ? [blog.author_name] : undefined,
      tags: blog.tags,
      images: blog.cover_image
        ? [{ url: blog.cover_image, alt: blog.title }]
        : undefined
    },
    twitter: {
      card: blog.cover_image ? "summary_large_image" : "summary",
      title: blog.title,
      description: blog.subtitle || "",
      images: blog.cover_image ? [blog.cover_image] : undefined
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Blog Not Found
          </h1>
          <p className="text-gray-600">
            The blog post you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <BlogPreview blog={blog as any} />
      </div>
    </div>
  );
}
