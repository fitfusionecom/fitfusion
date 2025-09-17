import { fitfusionConfig } from "@/lib/fitfusion-config";

export default function AboutUs() {
  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <div
        className="container"
        style={{
          padding: "20px 20px",
          marginBottom: "20px",
        }}
      >
        {/* YouTube Video */}
        {/* <div style={{ marginBottom: "40px", textAlign: "center" }}>
          <iframe
            width="100%"
            height="400"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="About FitFusion Ayurveda"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ maxWidth: "800px" }}
          ></iframe>
        </div> */}

        {/* Title */}
        <div style={{ marginBottom: "20px", textAlign: "center" }}>
          <h1
            style={{
              color: "black",
              fontSize: "2.5rem",
              fontWeight: "600",
              margin: "0",
            }}
          >
            Welcome to {fitfusionConfig.brand.name}
          </h1>
        </div>

        {/* Description */}
        <div style={{ textAlign: "center" }}>
          <p
            style={{
              color: "black",
              fontSize: "1.1rem",
              lineHeight: "1.6",
              maxWidth: "800px",
              margin: "0 auto",
              marginBottom: "20px",
            }}
          >
            At {fitfusionConfig.brand.name}, we believe that true wellness lies
            in the heart of nature. Our journey began with a simple yet powerful
            vision to help people live healthier and happier lives through pure,
            trusted, and side effect free herbal Ayurvedic products.
          </p>
          <p
            style={{
              color: "black",
              fontSize: "1.1rem",
              lineHeight: "1.6",
              maxWidth: "800px",
              margin: "0 auto",
              marginBottom: "20px",
            }}
          >
            Every product we create is made from 100% natural and authentic
            Ayurvedic herbs, carefully sourced from trusted suppliers. This
            dedication to quality and purity is why thousands of happy customers
            are already a part of the {fitfusionConfig.brand.name} family.
          </p>
          <p
            style={{
              color: "black",
              fontSize: "1.1rem",
              lineHeight: "1.6",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            Our range is designed to address some of the most important aspects
            of health. We provide natural solutions for men's health and sexual
            wellness, offer herbal support for managing diabetes, help improve
            digestion for daily comfort, and work to strengthen the immune
            system so the body stays naturally protected.
          </p>
        </div>

        {/* New Section with Heading and Banner */}
        <div style={{ marginTop: "60px", textAlign: "center" }}>
          {/* Section Heading */}
          <h2
            style={{
              color: "black",
              fontSize: "2rem",
              fontWeight: "600",
              margin: "0 0 30px 0",
            }}
          >
            Our Ayurvedic Heritage
          </h2>

          {/* Content about formula blending */}
          <div style={{ marginBottom: "30px" }}>
            <p
              style={{
                color: "black",
                fontSize: "1.1rem",
                lineHeight: "1.6",
                maxWidth: "800px",
                margin: "0 auto",
                marginBottom: "20px",
              }}
            >
              Each formula is the result of blending time-tested Ayurvedic
              wisdom with modern research, ensuring that every pack delivers not
              just results, but also trust.
            </p>
            <p
              style={{
                color: "black",
                fontSize: "1.1rem",
                lineHeight: "1.6",
                maxWidth: "800px",
                margin: "0 auto",
              }}
            >
              Our latest launches – <b>No More Addiction</b> (a natural solution
              to overcome harmful habits) and <b>Sleep-O-Fit</b> (herbal support
              for deep, restful sleep) continue our mission of promoting
              complete physical and mental well-being.
            </p>
          </div>

          {/* Banner Image */}
          <div
            style={{
              width: "100%",
              maxWidth: "1000px",
              margin: "0 auto",
              borderRadius: "8px",
              overflow: "hidden",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src="/assets/images/about-us2.png"
              alt="Ayurvedic Heritage Banner"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />
          </div>
        </div>

        {/* Holistic Solutions Section */}
        <div style={{ marginTop: "60px" }}>
          {/* Section Heading */}
          <h2
            style={{
              color: "#1a4d2e",
              fontSize: "2rem",
              fontWeight: "600",
              margin: "0 0 30px 0",
              textAlign: "center",
              position: "relative",
            }}
          >
            Holistic Solutions for Your Everyday Needs
            <div
              style={{
                width: "120px",
                height: "2px",
                background: "#1a4d2e",
                margin: "15px auto 0 auto",
                borderRadius: "1px",
              }}
            ></div>
          </h2>

          {/* Two Column Layout */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "50px",
              maxWidth: "1000px",
              margin: "0 auto",
            }}
          >
            {/* Left Column - Image */}
            <div style={{ flex: "1" }}>
              <img
                src="/assets/images/about-us3.png"
                alt="Ayurvedic Products Collection"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
              />
            </div>

            {/* Right Column - Text Description */}
            <div style={{ flex: "1", textAlign: "left" }}>
              <p
                style={{
                  color: "black",
                  fontSize: "1.1rem",
                  lineHeight: "1.7",
                  margin: "0",
                  textAlign: "justify",
                }}
              >
                {fitfusionConfig.brand.name} products are developed by Ayurvedic
                experts with decades of experience in Ayurveda and a deep
                understanding of the scientific principles behind Ayurvedic
                ingredients. {fitfusionConfig.brand.shortName} offers Holistic
                Ayurvedic solutions for every health needs like immunity,
                energy, stress, sleep, gut health, pain and more. All our
                products carry the hallmark of the 5000-year-old science of
                Ayurveda and hence, they are prevention-oriented solutions that
                help in disease management.
              </p>
            </div>
          </div>
        </div>

        {/* Mission & Vision Section */}
        <div style={{ marginTop: "60px", textAlign: "center" }}>
          {/* Section Heading with Golden Underline */}
          <h2
            style={{
              color: "black",
              fontSize: "2rem",
              fontWeight: "600",
              margin: "0 0 30px 0",
              position: "relative",
            }}
          >
            Our Mission
            <div
              style={{
                width: "80px",
                height: "3px",
                background: "linear-gradient(90deg, #D4AF37, #FFD700)",
                margin: "15px auto 0 auto",
                borderRadius: "2px",
              }}
            ></div>
          </h2>

          {/* Mission Content */}
          <div style={{ marginTop: "30px" }}>
            <p
              style={{
                color: "black",
                fontSize: "1.1rem",
                lineHeight: "1.6",
                maxWidth: "800px",
                margin: "0 auto",
                marginBottom: "20px",
              }}
            >
              We don't just sell products we promote a lifestyle of health and
              balance. At {fitfusionConfig.brand.name}, our mission is to help
              people reconnect with nature, even in today's fast-paced life, and
              achieve long term wellness the natural way.
            </p>
          </div>
        </div>

        {/* Bottom Image Section */}
        <div style={{ marginTop: "60px", textAlign: "center" }}>
          <img
            src="/assets/images/about-us1.png"
            alt="Ayurvedic Wellness"
            style={{
              width: "100%",
              maxWidth: "1000px",
              height: "auto",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
