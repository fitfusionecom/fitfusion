"use client";

import React, { useEffect } from "react";
import "./AppointmentSuccessPopup.css";

interface AppointmentSuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  patientName?: string;
  appointmentDate?: string;
  appointmentTime?: string;
  contactNumber?: string;
}

export const AppointmentSuccessPopup: React.FC<AppointmentSuccessPopupProps> = ({
  isOpen,
  onClose,
  patientName,
  appointmentDate,
  appointmentTime,
  contactNumber,
}) => {
  // Close popup on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when popup is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":");
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="appointment-popup-overlay" onClick={onClose}>
      <div
        className="appointment-popup-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className="appointment-popup-close" onClick={onClose}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 6L6 18M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Success Icon */}
        <div className="appointment-popup-icon">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" fill="#10b981" />
            <path
              d="M9 12L11 14L15 10"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Success Message */}
        <div className="appointment-popup-content">
          <h2 className="appointment-popup-title">
            Appointment Booked Successfully! 🎉
          </h2>
          
          <p className="appointment-popup-message">
            Thank you, <strong>{patientName || "Patient"}</strong>! Your appointment has been confirmed.
          </p>

          {/* Appointment Details */}
          <div className="appointment-popup-details">
            <div className="appointment-detail-item">
              <span className="appointment-detail-label">Date:</span>
              <span className="appointment-detail-value">
                {appointmentDate ? formatDate(appointmentDate) : "N/A"}
              </span>
            </div>
            <div className="appointment-detail-item">
              <span className="appointment-detail-label">Time:</span>
              <span className="appointment-detail-value">
                {appointmentTime ? formatTime(appointmentTime) : "N/A"}
              </span>
            </div>
            <div className="appointment-detail-item">
              <span className="appointment-detail-label">Duration:</span>
              <span className="appointment-detail-value">15 minutes</span>
            </div>
            <div className="appointment-detail-item">
              <span className="appointment-detail-label">Fee:</span>
              <span className="appointment-detail-value">₹99</span>
            </div>
          </div>

          {/* WhatsApp Message */}
          <div className="appointment-popup-whatsapp">
            <div className="whatsapp-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"
                  fill="#25D366"
                />
              </svg>
            </div>
            <div className="whatsapp-message">
              <p className="whatsapp-text">
                <strong>📱 WhatsApp Notification</strong>
              </p>
              <p className="whatsapp-details">
                We will share your meeting link on your WhatsApp number{" "}
                <strong>{contactNumber || "provided"}</strong> shortly.
              </p>
              <p className="whatsapp-note">
                Please keep your phone handy for the meeting link!
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="appointment-popup-actions">
            <button
              className="appointment-popup-button primary"
              onClick={onClose}
            >
              Got it!
            </button>
            <button
              className="appointment-popup-button secondary"
              onClick={() => {
                // You can add functionality to open WhatsApp or send a message
                window.open(
                  `https://wa.me/91${contactNumber?.replace(/\D/g, "") || ""}`,
                  "_blank"
                );
              }}
            >
              Open WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
