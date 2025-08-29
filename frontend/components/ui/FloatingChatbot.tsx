"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, MessageSquare } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  // Close chatbot when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleWhatsAppClick = () => {
    // Replace with your actual WhatsApp number
    const phoneNumber = "+919876543210"; // Update this with your actual number
    const message = "Hi! I have a query about Fit Fusion Ayurveda products.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        ref={buttonRef}
        onClick={toggleChatbot}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9999,
          backgroundColor: "#059669",
          color: "white",
          borderRadius: "50%",
          padding: "16px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
          width: "50px",
          height: "50px",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.1)";
          e.currentTarget.style.backgroundColor = "#047857";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.backgroundColor = "#059669";
        }}
        aria-label="Open chat"
      >
        {isOpen ? (
          <X style={{ width: "20px", height: "20px" }} />
        ) : (
          <MessageCircle style={{ width: "20px", height: "20px" }} />
        )}
      </button>

      {/* Chat Popover */}
      {isOpen && (
        <div
          ref={popoverRef}
          style={{
            position: "fixed",
            bottom: "100px",
            right: "24px",
            zIndex: 9998,
            width: "320px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            border: "1px solid #e5e7eb",
            animation: "slideIn 0.3s ease-out",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#059669",
              color: "white",
              padding: "16px",
              borderTopLeftRadius: "8px",
              borderTopRightRadius: "8px",
            }}
          >
            <h3 style={{ fontSize: "18px", fontWeight: "600", margin: 0 }}>
              Chat with us
            </h3>
          </div>

          {/* Content */}
          <div style={{ padding: "24px" }}>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div
                style={{
                  width: "64px",
                  height: "64px",
                  backgroundColor: "#d1fae5",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 12px auto",
                }}
              >
                <MessageCircle
                  style={{ width: "32px", height: "32px", color: "#059669" }}
                />
              </div>
              <h4
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                  color: "#1f2937",
                  margin: "0 0 8px 0",
                }}
              >
                Need help?
              </h4>
              <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
                Get instant support via WhatsApp or ask us anything about our
                products
              </p>
            </div>

            {/* WhatsApp Button */}
            <button
              onClick={handleWhatsAppClick}
              style={{
                width: "100%",
                backgroundColor: "#10b981",
                color: "white",
                fontWeight: "500",
                padding: "12px 16px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                marginBottom: "16px",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#059669";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#10b981";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <FaWhatsapp style={{ width: "20px", height: "20px" }} />
              Ask Query on WhatsApp
            </button>

            {/* Additional Info */}
            <div style={{ textAlign: "center" }}>
              <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
                Response time: Usually within 5 minutes
              </p>
            </div>
          </div>

          {/* Close Button */}
          <div style={{ padding: "16px", borderTop: "1px solid #f3f4f6" }}>
            <button
              onClick={toggleChatbot}
              style={{
                width: "100%",
                color: "#6b7280",
                fontSize: "14px",
                fontWeight: "500",
                border: "none",
                backgroundColor: "transparent",
                cursor: "pointer",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#374151";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#6b7280";
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default FloatingChatbot;
