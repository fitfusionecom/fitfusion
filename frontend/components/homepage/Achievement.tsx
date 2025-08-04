"use client";

import Image from "next/image";

const achievements = [
  {
    icon: "/assets/images/achieve-icon1.png",
    number: 10,
    text: "Years of Excellence",
    suffix: "+",
    alt: "Years of Excellence Icon",
  },
  {
    icon: "/assets/images/achieve-icon2.png",
    number: 5000,
    text: "Happy Customers",
    suffix: "+",
    alt: "Happy Customers Icon",
  },
  {
    icon: "/assets/images/achieve-icon3.png",
    number: 100,
    text: "Natural Products",
    suffix: "+",
    alt: "Natural Products Icon",
  },
  {
    icon: "/assets/images/achieve-icon4.png",
    number: 100,
    text: "Product Purity",
    suffix: "%",
    alt: "Product Purity Icon",
  },
];

export default function Achievement() {
  return (
    <div className="ayur-bgcover ayur-achievement-sec">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-4 col-md-12 col-sm-12">
            <div className="ayur-heading-wrap ayur-heading-left">
              <h5>Why Choose FitFusion?</h5>
              <h3>Empowering Wellness with Ayurveda</h3>
              <p>
                At FitFusion, we are dedicated to delivering authentic Ayurvedic
                solutions that nurture your body, mind, and soul. Our commitment
                to quality and customer satisfaction has helped us achieve
                remarkable milestones.
              </p>
            </div>
          </div>
          <div className="col-lg-8 col-md-12 col-sm-12">
            <div className="ayur-achieve-box-wrapper">
              {achievements.map((achievement, index) => (
                <div key={index} className="ayur-achieve-box">
                  <div className="ayur-achieve-icon">
                    <Image
                      src={achievement.icon}
                      alt={achievement.alt}
                      width={60}
                      height={60}
                    />
                  </div>
                  <div className="ayur-achieve-text">
                    <h2 className="ayur-counting" data-to={achievement.number}>
                      {achievement.number}
                    </h2>
                    <p>{achievement.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
