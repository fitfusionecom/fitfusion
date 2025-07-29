"use client";

import Image from "next/image";

const achievements = [
  {
    icon: "/assets/images/achieve-icon1.png",
    number: 25,
    text: "Years Experience",
    suffix: "",
  },
  {
    icon: "/assets/images/achieve-icon2.png",
    number: 60,
    text: "Happy Customers",
    suffix: "+",
  },
  {
    icon: "/assets/images/achieve-icon3.png",
    number: 800,
    text: "Our Products",
    suffix: "+",
  },
  {
    icon: "/assets/images/achieve-icon4.png",
    number: 100,
    text: "Product Purity",
    suffix: "%",
  },
];

export default function Achievement() {
  return (
    <div className="ayur-bgcover ayur-achievement-sec">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-4 col-md-12 col-sm-12">
            <div className="ayur-heading-wrap ayur-heading-left">
              <h5>Our Recent Achievements</h5>
              <h3>Benefit From Choosing The Best</h3>
            </div>
          </div>
          <div className="col-lg-8 col-md-12 col-sm-12">
            <div className="ayur-achieve-box-wrapper">
              {achievements.map((achievement, index) => (
                <div key={index} className="ayur-achieve-box">
                  <div className="ayur-achieve-icon">
                    <Image
                      src={achievement.icon}
                      alt="achievement icon"
                      width={60}
                      height={60}
                    />
                  </div>
                  <div className="ayur-achieve-text">
                    <h2 className="ayur-counting" data-to={achievement.number}>
                      {achievement.number}
                      {achievement.suffix}
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
