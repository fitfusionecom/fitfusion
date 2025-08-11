import Image from "next/image";
import Link from "next/link";
import { getAllBlogPosts, getBlogPostsByCategory } from "@/lib/data/blog";
import { FaCalendar, FaClock, FaUser, FaTag } from "react-icons/fa";
import "@/components/blog/Blog.css";

export default function BlogPage() {
  const allPosts = getAllBlogPosts();
  const categories = [
    "all",
    "liver-health",
    "ayurveda",
    "wellness",
    "natural-remedies",
  ];

  return (
    <div className="blog-page">
      {/* Header */}
      <div className="blog-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="blog-header-content text-center">
                <h1 className="blog-main-title">Ayurveda Blog</h1>
                <p className="blog-subtitle">
                  Discover ancient wisdom and modern insights for holistic
                  wellness. Explore our collection of articles on Ayurveda,
                  natural remedies, and healthy living.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      {/* <div className="blog-categories">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="category-filters text-center">
                  {categories.map((category) => (
                    <Link
                      key={category}
                      href={
                        category === "all"
                          ? "/blog"
                          : `/blog?category=${category}`
                      }
                      className="category-filter-btn"
                    >
                      {category === "all"
                        ? "All Posts"
                        : category.replace("-", " ")}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div> */}

      {/* Blog Posts Grid */}
      <div className="blog-posts-section">
        <div className="container">
          <div className="row">
            {allPosts.map((post) => (
              <div key={post.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <article className="blog-post-card">
                  {/* Featured Image */}
                  <div className="blog-post-image">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={400}
                      height={250}
                      className="img-fluid"
                    />
                    <div className="blog-category-badge">
                      {post.category.replace("-", " ")}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="blog-post-content">
                    <div className="blog-post-meta">
                      <span className="meta-item">
                        <FaUser className="meta-icon" />
                        {post.author}
                      </span>
                      <span className="meta-item">
                        <FaClock className="meta-icon" />
                        {post.readTime}
                      </span>
                    </div>

                    <h2 className="blog-post-title">{post.title}</h2>

                    <p className="blog-post-excerpt">{post.description}</p>

                    {/* Hindi Preview */}
                    <div className="hindi-preview">
                      <h3 className="hindi-preview-title">हिंदी में</h3>
                      <p className="hindi-preview-text">
                        {post.descriptionHindi}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="blog-post-tags">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="blog-tag">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More Button */}
                    <Link
                      href={`/blog/${post.id}`}
                      className="blog-read-more-btn"
                    >
                      Read Full Article
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Signup */}
      {/* <div className="blog-newsletter">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto">
              <div className="newsletter-content text-center">
                <h2 className="newsletter-title">
                  Stay Updated with Ayurveda Wisdom
                </h2>
                <p className="newsletter-description">
                  Get the latest articles on natural health, wellness tips, and
                  Ayurvedic remedies delivered directly to your inbox.
                </p>
                <div className="newsletter-form">
                  <div className="row">
                    <div className="col-md-8">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="form-control newsletter-input"
                      />
                    </div>
                    <div className="col-md-4">
                      <button className="btn newsletter-btn">Subscribe</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
