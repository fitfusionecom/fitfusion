"use client";

import Image from "next/image";
import Link from "next/link";

const blogPosts = [
  {
    id: 1,
    title: "Duis aute irure dolor in velit voluptate esse",
    category: "Ayurveda Medicine",
    date: "June 17,2024",
    image: "https://dummyimage.com/366x201/",
    excerpt:
      "It is a long established was a fact that a reader will be distracted by the readable content.",
    isInline: false,
  },
  {
    id: 2,
    title: "Duis aute irure dolor in velit voluptate esse",
    category: "Ayurveda Medicine",
    date: "June 17,2024",
    image: "https://dummyimage.com/366x201/",
    excerpt:
      "It is a long established was a fact that a reader will be distracted by the readable content.",
    isInline: false,
  },
  {
    id: 3,
    title: "Duis aute irure dolor in velit voluptate esse",
    category: "Ayurveda Medicine",
    image: "https://dummyimage.com/91x91/",
    isInline: true,
  },
  {
    id: 4,
    title: "Duis aute irure dolor in velit voluptate esse",
    category: "Ayurveda Medicine",
    image: "https://dummyimage.com/91x91/",
    isInline: true,
  },
  {
    id: 5,
    title: "Duis aute irure dolor in velit voluptate esse",
    category: "Ayurveda Medicine",
    image: "https://dummyimage.com/91x91/",
    isInline: true,
  },
];

export default function Blog() {
  const mainPosts = blogPosts.filter((post) => !post.isInline);
  const inlinePosts = blogPosts.filter((post) => post.isInline);

  return (
    <div className="ayur-bgcover ayur-blog-sec">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="ayur-heading-wrap">
              <h5>Blog</h5>
              <h3>Our Latest News</h3>
            </div>
          </div>
        </div>
        <div className="row">
          {mainPosts.map((post) => (
            <div key={post.id} className="col-lg-4 col-md-6 col-sm-6">
              <div className="ayur-blog-box">
                <div className="ayur-blog-img">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={366}
                    height={201}
                  />
                </div>
                <div className="ayur-blog-text">
                  <div className="ayur-blog-date">
                    <h4>{post.category}</h4>
                    <p>{post.date}</p>
                  </div>
                  <h3>
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                  <p>{post.excerpt}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="col-lg-4 col-md-12 col-sm-12">
            {inlinePosts.map((post) => (
              <div key={post.id} className="ayur-blog-box ayur-blog-inline">
                <div className="ayur-blog-img">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={91}
                    height={91}
                  />
                </div>
                <div className="ayur-blog-text">
                  <div className="ayur-blog-date">
                    <h4>{post.category}</h4>
                  </div>
                  <h3>
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="ayur-bgshape ayur-blog-bgshape">
        <Image
          src="/assets/images/bg-shape6.png"
          alt="shape"
          width={200}
          height={200}
        />
        <Image
          src="/assets/images/bg-leaf6.png"
          alt="leaf"
          width={150}
          height={150}
        />
      </div>
    </div>
  );
}
