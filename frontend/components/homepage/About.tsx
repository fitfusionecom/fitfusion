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
                src="/assets/images/ban-head-Image.png"
                alt="FitFusion Ayurveda"
                width={561}
                height={348}
                data-tilt
                data-tilt-max="10"
                data-tilt-speed="1000"
                data-tilt-perspective="1000"
              />
              <div className="ayur-about-exp">
                <p>10+</p>
                <p>Years of Excellence</p>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-sm-12">
            <div className="ayur-heading-wrap ayur-about-head">
              <h5>About FitFusion</h5>
              <h3>Empowering Body, Mind & Soul with Ayurveda</h3>
              <p>
                At FitFusion, we believe in a holistic approach to health and
                wellness, rooted in the ancient wisdom of Ayurveda. Our mission
                is to empower you to achieve total well-being by balancing mind,
                body, and spirit with natural, time-tested remedies and rituals.
                Discover the natural way to optimal health and harmony—because
                you deserve to thrive, not just survive.
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
