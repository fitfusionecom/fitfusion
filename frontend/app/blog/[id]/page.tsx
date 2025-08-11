import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getBlogPost } from "@/lib/data/blog";
import MarkdownRenderer from "@/components/blog/MarkdownRenderer";
import {
  FaArrowLeft,
  FaCalendar,
  FaClock,
  FaUser,
  FaTag,
} from "react-icons/fa";
import "@/components/blog/Blog.css";

export default function BlogPostPage({ params }: any) {
  const post = getBlogPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="blog-post-page">
      {/* Header */}
      <div className="blog-post-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <Link href="/blog" className="back-to-blog-btn">
                <FaArrowLeft className="back-icon" />
                Back to Blog
              </Link>

              <div className="blog-post-info">
                <h1 className="blog-post-title-main">{post.title}</h1>

                <div className="blog-post-meta-main">
                  <span className="meta-item-main">
                    <FaUser className="meta-icon-main" />
                    {post.author}
                  </span>
                  <span className="meta-item-main">
                    <FaCalendar className="meta-icon-main" />
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="meta-item-main">
                    <FaClock className="meta-icon-main" />
                    {post.readTime}
                  </span>
                </div>

                <div className="blog-post-tags-main">
                  {post.tags.map((tag: string) => (
                    <span key={tag} className="blog-tag-main">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="blog-post-content-main">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="blog-post-content-wrapper">
                {/* Featured Image */}
                <div className="blog-post-featured-image">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={600}
                    height={400}
                    className="img-fluid"
                  />
                </div>

                {/* Hindi Title */}
                <div className="hindi-title-section">
                  <h2 className="hindi-title">{post.titleHindi}</h2>
                  <p className="hindi-description">{post.descriptionHindi}</p>
                </div>

                {/* English Content */}
                <div className="content-section">
                  <h3 className="content-section-title">English Version</h3>
                  <MarkdownRenderer content={post.content} />
                </div>

                {/* Hindi Content */}
                <div className="content-section">
                  <h3 className="content-section-title">हिंदी में पढ़ें</h3>
                  <MarkdownRenderer content={post.contentHindi} />
                </div>

                {/* Call to Action */}
                <div className="blog-cta-section">
                  <h3 className="cta-title">Ready to Transform Your Health?</h3>
                  <p className="cta-description">
                    Discover our range of authentic Ayurvedic products designed
                    to support your wellness journey.
                  </p>
                  <Link href="/shop" className="cta-button">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
