import { fitfusionConfig } from "@/lib/fitfusion-config";

export default function AboutUs() {
  return (
    <div style={{ background: "white", minHeight: "100vh" }}>
      <div className="container" style={{ padding: "60px 20px" }}>
        {/* YouTube Video */}
        <div style={{ marginBottom: "40px", textAlign: "center" }}>
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
        </div>

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
            Discover the ancient wisdom of Ayurveda with our premium natural
            products. We are committed to bringing you authentic, high-quality
            ayurvedic solutions that promote holistic wellness and balance in
            your life.
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
            Founded in {fitfusionConfig.brand.foundedYear}, we have been
            dedicated to preserving traditional ayurvedic practices while
            incorporating modern quality standards. Our products are carefully
            sourced, tested, and formulated to ensure the highest efficacy and
            safety for our customers.
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
              src="/assets/images/banners/1.png"
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
                src="http://localhost:8000/_next/image?url=%2Fassets%2Fimages%2Fabout-us.png&w=640&q=75"
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
            Our Mission & Vision
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
        </div>

        {/* Bottom Image Section */}
        <div style={{ marginTop: "60px", textAlign: "center" }}>
          <img
            src="/assets/images/banners/3.png"
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
