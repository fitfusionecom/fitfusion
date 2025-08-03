"use client";

import Image from "next/image";
import Link from "next/link";

const recentBlogs = [
  {
    id: 1,
    title: "Amet minim mollit non deserunt est sit Velit officia consequat.",
    date: "Jun 10,2024",
    image: "https://dummyimage.com/91x91/.png",
  },
  {
    id: 2,
    title: "Amet minim mollit non deserunt est sit Velit officia consequat.",
    date: "Jun 10,2024",
    image: "https://dummyimage.com/91x91/.png",
  },
];

export default function Footer() {
  return (
    <div className="ayur-footer-section">
      <div className="container">
        {/* <div className="ayur-sign-sec">
          <div className="row align-items-center">
            <div className="col-lg-4 col-md-4 col-sm-12">
              <div className="ayur-sign-head">
                <h3>Sign Up To Get Updates & News About Us..</h3>
              </div>
            </div>
            <div className="col-lg-8 col-md-8 col-sm-12">
              <form method="" className="ayur-subscribe-sec">
                <div className="ayur-form-input">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Your Email..."
                    name="email"
                  />
                </div>
                <div className="ayur-form-btn">
                  <a href="javascript:void(0)" className="ayur-btn">
                    Subscribe
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div> */}
        <div className="ayur-footer-sec">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="ayur-footer-logosec">
                <div className="ayur-footer-logo">
                  <Image
                    src="/fitfusion.JPG"
                    alt="logo"
                    width={110}
                    height={50}
                  />
                </div>
                <p>
                  Amet minim mollit non deserunt ullamco est sit Velit officia
                  consequat duis enim velit mollit. sunt nostrud amet. Excepteur
                  sint occaecat.
                </p>
                <ul className="ayur-social-link">
                  <li>
                    <a href="javascript:void(0)">
                      <svg
                        width="11"
                        height="20"
                        viewBox="0 0 11 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.74157 20V10.8777H9.80231L10.2615 7.32156H6.74157V5.05147C6.74157 4.0222 7.02622 3.32076 8.50386 3.32076L10.3854 3.31999V0.13923C10.06 0.0969453 8.94308 0 7.64308 0C4.92848 0 3.07002 1.65697 3.07002 4.69927V7.32156H0V10.8777H3.07002V20H6.74157Z"
                          fill="#E4D4CF"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.8138 8.46864L19.0991 0H17.3727L11.0469 7.3532L5.9944 0H0.166992L7.8073 11.1193L0.166992 20H1.89349L8.57377 12.2348L13.9095 20H19.7369L11.8133 8.46864H11.8138ZM9.4491 11.2173L8.67498 10.1101L2.51557 1.29967H5.16736L10.1381 8.40994L10.9122 9.51718L17.3735 18.7594H14.7218L9.4491 11.2177V11.2173Z"
                          fill="#E4D4CF"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <svg
                        width="17"
                        height="20"
                        viewBox="0 0 17 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.89667 0C3.41417 0.000833333 0.5 3.51333 0.5 7.34333C0.5 9.11917 1.4925 11.335 3.08167 12.0375C3.535 12.2417 3.475 11.9925 3.865 10.5008C3.88295 10.4406 3.88454 10.3766 3.8696 10.3156C3.85466 10.2545 3.82374 10.1985 3.78 10.1533C1.50833 7.52583 3.33667 2.12417 8.5725 2.12417C16.15 2.12417 14.7342 12.6092 9.89083 12.6092C8.6425 12.6092 7.7125 11.6292 8.00667 10.4167C8.36333 8.9725 9.06167 7.42 9.06167 6.37917C9.06167 3.75583 5.15333 4.145 5.15333 7.62083C5.15333 8.695 5.53333 9.42 5.53333 9.42C5.53333 9.42 4.27583 14.5 4.0425 15.4492C3.6475 17.0558 4.09583 19.6567 4.135 19.8808C4.15917 20.0042 4.2975 20.0433 4.375 19.9417C4.49917 19.7792 6.01917 17.6108 6.445 16.0433C6.6 15.4725 7.23583 13.1558 7.23583 13.1558C7.655 13.9125 8.86333 14.5458 10.1508 14.5458C13.9808 14.5458 16.7492 11.1792 16.7492 7.00167C16.7358 2.99667 13.3083 0 8.89667 0Z"
                          fill="#E4D4CF"
                        />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">
                      <svg
                        width="21"
                        height="20"
                        viewBox="0 0 21 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.4996 0H5.49988C2.75019 0 0.5 2.25019 0.5 4.99988V15.0001C0.5 17.7491 2.75019 20 5.49988 20H15.4996C18.2493 20 20.4995 17.7491 20.4995 15.0001V4.99988C20.4995 2.25019 18.2493 0 15.4996 0ZM18.8328 15.0001C18.8328 16.8376 17.3381 18.3333 15.4996 18.3333H5.49988C3.66218 18.3333 2.16671 16.8376 2.16671 15.0001V4.99988C2.16671 3.16193 3.66218 1.66671 5.49988 1.66671H15.4996C17.3381 1.66671 18.8328 3.16193 18.8328 4.99988V15.0001Z"
                          fill="#E4D4CF"
                        />
                        <path
                          d="M15.9172 5.83295C16.6075 5.83295 17.1672 5.27332 17.1672 4.58298C17.1672 3.89264 16.6075 3.33301 15.9172 3.33301C15.2269 3.33301 14.6672 3.89264 14.6672 4.58298C14.6672 5.27332 15.2269 5.83295 15.9172 5.83295Z"
                          fill="#E4D4CF"
                        />
                        <path
                          d="M10.4999 5C7.73793 5 5.5 7.23818 5.5 9.99988C5.5 12.7606 7.73793 15.0002 10.4999 15.0002C13.261 15.0002 15.4998 12.7606 15.4998 9.99988C15.4998 7.23818 13.261 5 10.4999 5ZM10.4999 13.3335C8.65915 13.3335 7.16671 11.8411 7.16671 9.99988C7.16671 8.15866 8.65915 6.66671 10.4999 6.66671C12.3406 6.66671 13.833 8.15866 13.833 9.99988C13.833 11.8411 12.3406 13.3335 10.4999 13.3335Z"
                          fill="#E4D4CF"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="ayur-footer-box">
                <h4>Useful Links</h4>
                <ul className="ayur-links">
                  <li>
                    <a href="javascript:void(0)">Shipping Options</a>
                  </li>
                  <li>
                    <Link href="/wishlist">My Wishlist</Link>
                  </li>
                  <li>
                    <Link href="/profile">My Account</Link>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Return Policy</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Shopping FAQss</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="ayur-footer-box">
                <h4>Contact Info</h4>
                <ul className="ayur-contact-list">
                  <li className="ayur-contact-box">
                    <Image
                      src="/assets/images/location.png"
                      alt="location"
                      width={20}
                      height={20}
                    />
                    <p>
                      4517 Washington Ave. <br />
                      Manchester, Kentucky 39495
                    </p>
                  </li>
                  <li className="ayur-contact-box">
                    <Image
                      src="/assets/images/mobile.png"
                      alt="mobile"
                      width={20}
                      height={20}
                    />
                    <p>(208) 555-0112</p>
                  </li>
                  <li className="ayur-contact-box">
                    <Image
                      src="/assets/images/email.png"
                      alt="email"
                      width={20}
                      height={20}
                    />
                    <p>example@gmail.com</p>
                  </li>
                </ul>
              </div>
            </div>
            {/* <div className="col-lg-3 col-md-6 col-sm-6 px-0">
              <div className="ayur-footer-box">
                <h4>Recent Blog</h4>
                <ul className="ayur-recent-blog">
                  {recentBlogs.map((blog) => (
                    <li key={blog.id} className="ayur-recentblog-box">
                      <div className="ayur-recentblog-boximg">
                        <Image
                          src={blog.image}
                          alt="blog"
                          width={91}
                          height={91}
                        />
                      </div>
                      <div className="ayur-recentblog-text">
                        <p className="date">{blog.date}</p>
                        <h3 className="text">{blog.title}</h3>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div> */}
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="ayur-copyright-para">
              <p>Copyright © 2024. All Right Reserved. Pure Ayurveda</p>
            </div>
          </div>
        </div>
      </div>
      <div className="ayur-bgshape ayur-footer-bgshape">
        <Image
          src="/assets/images/footer-left.png"
          alt="shape"
          width={325}
          height={284}
        />
        <Image
          src="/assets/images/footer-right.png"
          alt="footer right"
          width={200}
          height={200}
        />
      </div>
    </div>
  );
}
