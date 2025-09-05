"use client";

import { useState } from "react";
import "./Newsletter.css";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="container">
        <div className="newsletter-wrapper">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h2>Subscribe to Fit Fusion Ayurveda</h2>
              <p>
                Find out all about our latest offers, new products, and guides
                to Ayurveda via Fit Fusion Ayurveda newsletters
              </p>
            </div>

            <div className="newsletter-form">
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Subscribe</button>
              </form>

              {isSubscribed && (
                <div className="success-msg">Thank you for subscribing! 🎉</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
