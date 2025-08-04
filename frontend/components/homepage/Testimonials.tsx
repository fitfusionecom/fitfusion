"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    text: "I have been using FitFusion's Ayurvedic products for the past 6 months and I can truly feel the difference. My energy levels have improved and my skin feels so much healthier. Thank you for bringing authentic Ayurveda to us!",
    name: "Priya Sharma",
    image: "/assets/images/testimonial-priya.jpg",
    city: "Mumbai, Maharashtra",
  },
  {
    id: 2,
    text: "Being a working professional, I hardly get time to take care of my health. FitFusion's herbal supplements are easy to use and have helped me manage stress and improve my sleep. Highly recommended for everyone!",
    name: "Rahul Verma",
    image: "/assets/images/testimonial-rahul.jpg",
    city: "Bangalore, Karnataka",
  },
  {
    id: 3,
    text: "My mother suggested I try FitFusion for my hair fall issues. The natural oils and shampoos have worked wonders. I love that the products are made with traditional Indian herbs.",
    name: "Anjali Patel",
    image: "/assets/images/testimonial-anjali.jpg",
    city: "Ahmedabad, Gujarat",
  },
  {
    id: 4,
    text: "I was looking for genuine Ayurvedic solutions for my family. FitFusion's products are pure, effective, and remind me of the remedies my grandmother used to make at home.",
    name: "Suresh Kumar",
    image: "/assets/images/testimonial-suresh.jpg",
    city: "Chennai, Tamil Nadu",
  },
  {
    id: 5,
    text: "The immunity booster from FitFusion has become a daily part of my routine. I feel more energetic and haven't fallen sick this season. Thank you for such wonderful Indian products!",
    name: "Meera Joshi",
    image: "/assets/images/testimonial-meera.jpg",
    city: "Pune, Maharashtra",
  },
  {
    id: 6,
    text: "FitFusion's herbal teas are my favourite! They taste amazing and help me relax after a long day. Proud to support an Indian brand that values our traditional knowledge.",
    name: "Amit Singh",
    image: "/assets/images/testimonial-amit.jpg",
    city: "Delhi",
  },
];

function getInitial(name: string) {
  return name?.charAt(0).toUpperCase() || "";
}

export default function Testimonials() {
  return (
    <div className="ayur-bgcover ayur-testimonial-sec">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="ayur-heading-wrap ayur-test-head">
              <h5>Our Testimonials</h5>
              <h3>What Our Indian Customers Say</h3>
            </div>
          </div>
        </div>
        <div className="ayur-testimonial-section">
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ clickable: true }}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            className="ayur-testimonial-slider"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="ayur-test-box border mx-auto">
                  <div className="ayur-test-text">
                    <p>{testimonial.text}</p>
                  </div>
                  <div className="ayur-test-namesec">
                    <div
                      className="ayur-testname"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <div
                        style={{
                          width: 56,
                          height: 56,
                          borderRadius: "50%",
                          background: "#f3e6df",
                          color: "#CD8973",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: "2em",
                          flexShrink: 0,
                          boxShadow: "0 2px 8px rgba(205,137,115,0.08)",
                        }}
                        aria-label={`Initial of ${testimonial.name}`}
                      >
                        {getInitial(testimonial.name)}
                      </div>
                      <div>
                        <h3 style={{ margin: 0 }}>{testimonial.name}</h3>
                        <span style={{ fontSize: "0.95em", color: "#888" }}>
                          {testimonial.city}
                        </span>
                      </div>
                    </div>
                    <div className="ayur-testquote">
                      <svg
                        width="74"
                        height="53"
                        viewBox="0 0 74 53"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          opacity="0.1"
                          d="M13.8133 18.3798C12.1853 14.2231 9.62 10.1164 6.19133 6.16C5.106 4.90796 4.958 3.10504 5.846 1.70277C6.53667 0.600975 7.67133 0 8.90467 0C9.25 0 9.59533 0.0250397 9.94067 0.150242C17.1927 2.30374 34.1387 9.94113 34.6073 34.4309C34.78 43.8712 27.972 51.9844 19.1167 52.9109C14.208 53.4117 9.324 51.784 5.698 48.4787C3.90464 46.8276 2.47128 44.8141 1.48999 42.5673C0.508697 40.3205 0.0011672 37.8902 0 35.4325C0 27.1691 5.772 19.9324 13.8133 18.3798ZM58.4847 52.9109C53.6007 53.4117 48.7167 51.784 45.0907 48.4787C43.2972 46.8277 41.8638 44.8142 40.8824 42.5674C39.9011 40.3206 39.3937 37.8902 39.3927 35.4325C39.3927 27.1691 45.1647 19.9324 53.206 18.3798C51.578 14.2231 49.0127 10.1164 45.584 6.16C44.4987 4.90796 44.3507 3.10504 45.2387 1.70277C45.9293 0.600975 47.064 0 48.2973 0C48.6427 0 48.988 0.0250397 49.3333 0.150242C56.5853 2.30374 73.5313 9.94113 74 34.4309V34.7815C74 44.0715 67.266 51.9844 58.4847 52.9109Z"
                          fill="#CD8973"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-button-prev">
              <svg
                width="34"
                height="16"
                viewBox="0 0 34 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.765606 7.08664L0.766766 7.08542L7.50896 0.375738C8.01406 -0.126907 8.83103 -0.125037 9.33381 0.380125C9.83652 0.885222 9.83458 1.70219 9.32948 2.2049L4.80277 6.70968H32.1291C32.8418 6.70968 33.4194 7.28735 33.4194 8C33.4194 8.71265 32.8418 9.29032 32.1291 9.29032H4.80283L9.32942 13.7951C9.83451 14.2978 9.83645 15.1148 9.33374 15.6199C8.83097 16.1251 8.01393 16.1268 7.5089 15.6243L0.766701 8.91458L0.765541 8.91336C0.260185 8.40897 0.261799 7.58935 0.765606 7.08664Z"
                  fill="#797979"
                />
              </svg>
            </div>
            <div className="swiper-button-next">
              <svg
                width="34"
                height="16"
                viewBox="0 0 34 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32.6538 7.08664L32.6527 7.08542L25.9105 0.375738C25.4054 -0.126907 24.5884 -0.125037 24.0856 0.380125C23.5829 0.885222 23.5849 1.70219 24.09 2.2049L28.6167 6.70968H1.29032C0.577678 6.70968 0 7.28735 0 8C0 8.71265 0.577678 9.29032 1.29032 9.29032H28.6166L24.09 13.7951C23.5849 14.2978 23.583 15.1148 24.0857 15.6199C24.5885 16.1251 25.4055 16.1268 25.9105 15.6243L32.6527 8.91458L32.6539 8.91336C33.1592 8.40897 33.1576 7.58935 32.6538 7.08664Z"
                  fill="#CD8973"
                />
              </svg>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
