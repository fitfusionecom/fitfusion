"use client";

import Image from "next/image";
import Link from "next/link";

export default function About() {
  return (
    <div className="ayur-bgcover ayur-about-sec">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="ayur-about-img">
              <Image
                src="https://dummyimage.com/561x348/"
                alt="about image"
                width={561}
                height={348}
                data-tilt
                data-tilt-max="10"
                data-tilt-speed="1000"
                data-tilt-perspective="1000"
              />
              <div className="ayur-about-exp">
                <p>10</p>
                <p>Years of Experience</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="ayur-heading-wrap ayur-about-head">
              <h5>Who We Are</h5>
              <h3>The Natural Way To Achieving Balance And Optimal Health</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
              <Link href="/about" className="ayur-btn">
                Know More
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="ayur-bgshape ayur-about-bgshape">
        <Image
          src="/assets/images/bg-shape2.png"
          alt="shape"
          width={200}
          height={200}
        />
        <Image
          src="/assets/images/bg-leaf2.png"
          alt="leaf"
          width={150}
          height={150}
        />
      </div>
    </div>
  );
}
