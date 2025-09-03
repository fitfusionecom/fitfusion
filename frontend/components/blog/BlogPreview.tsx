import remarkGfm from "remark-gfm";
import "highlight.js/styles/github.css";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";

type BlogData = {
  id: string;
  title: string;
  slug: string;
  tags?: string[];
  content: string;
  subtitle?: string;
  updated_at: string;
  created_at: string;
  author_name: string;
  cover_image?: string;
  published_at?: string;
  status: "draft" | "published" | "archived";
};

type BlogPreviewProps = {
  blog: BlogData;
};

export default function BlogPreview({ blog }: BlogPreviewProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <article className="container-fluid">
      {/* Cover Image */}
      {blog.cover_image && (
        <div className="text-center" style={{ overflow: "hidden" }}>
          <img
            src={blog.cover_image}
            alt={blog.title}
            className="img-fluid"
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />
        </div>
      )}

      {/* Header */}
      <header className="py-4 border-bottom">
        <div className="mb-3">
          <h1 className=" fw-bold text-dark mb-2 text-center">{blog.title}</h1>
          {blog.subtitle && (
            <p className="lead text-muted text-center">{blog.subtitle}</p>
          )}
        </div>

        {/* Meta Information */}
        <div className="d-flex flex-wrap align-items-center justify-content-center gap-3 small text-muted">
          <div className="d-flex align-items-center justify-content-center">
            <span className="fw-medium text-center">By {blog.author_name}</span>
          </div>
          <div className="d-flex align-items-center">
            <span>
              Published on {formatDate(blog.published_at || blog.created_at)}
            </span>
          </div>
          {blog.tags && blog.tags.length > 0 && (
            <div className="d-flex align-items-center">
              <span>Tags:</span>
              <div className="d-flex flex-wrap ms-2">
                {blog.tags.map((tag, index) => (
                  <span key={index} className="badge bg-primary me-1 mb-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-4">
        <div>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              // Custom styling for markdown elements
              h1: ({ children }) => (
                <h1
                  className="h2 fw-bold text-dark mt-4 mb-3"
                  style={{ marginTop: "2rem !important" }}
                >
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="h3 fw-bold text-dark mt-4 mb-3">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="h4 fw-bold text-dark mt-3 mb-2">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-dark mb-3" style={{ lineHeight: "1.6" }}>
                  {children}
                </p>
              ),
              ul: ({ children }) => (
                <ul className="list-unstyled mb-3">{children}</ul>
              ),
              ol: ({ children }) => <ol className="mb-3">{children}</ol>,
              li: ({ children }) => (
                <li className="text-dark mb-1">{children}</li>
              ),
              blockquote: ({ children }) => (
                <blockquote className="border-start border-primary border-4 ps-3 fst-italic text-muted my-3">
                  {children}
                </blockquote>
              ),
              code: ({ children, className }) => {
                const isInline = !className;
                if (isInline) {
                  return (
                    <code className="bg-light text-dark px-1 py-1 rounded small">
                      {children}
                    </code>
                  );
                }
                return <code className={className}>{children}</code>;
              },
              pre: ({ children }) => (
                <pre className="bg-dark text-light p-3 rounded overflow-auto mb-3">
                  {children}
                </pre>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  className="text-primary text-decoration-underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
              img: ({ src, alt }) => (
                <img src={src} alt={alt} className="img-fluid rounded my-3" />
              ),
              table: ({ children }) => (
                <div className="table-responsive my-3">
                  <table className="table table-bordered">{children}</table>
                </div>
              ),
              th: ({ children }) => <th className="table-dark">{children}</th>,
              td: ({ children }) => <td>{children}</td>,
              hr: () => <hr className="my-4" />,
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>
      </div>

      {/* Footer */}
      <footer className="px-4 py-3 bg-light border-top">
        <div className="small text-muted">
          Last updated: {formatDate(blog.updated_at)}
        </div>
      </footer>
    </article>
  );
}
