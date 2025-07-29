"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { directLogin, login } from "@/lib/data/customer";
import Timer from "./timer";
import { sdk } from "@/lib/config"; // Homepage theme colors (example):
// Primary: #1B5E20 (green), Secondary: #F9A825 (yellow), Accent: #fff, Muted: #F5F5F5

export default function LoginForm() {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpView, setShowOtpView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpTimeout, setOtpTimeout] = useState(false);

  async function sendOtp() {
    try {
      setIsLoading(true);
      setError("");

      if (mobileNumber.length !== 10 || !/^\d+$/.test(mobileNumber)) {
        setError("Please enter a valid 10-digit mobile number");
        return;
      }

      // Simulate OTP sending
      setShowOtpView(true);
      setOtpTimeout(true);
    } catch (err) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmit() {
    try {
      setIsLoading(true);
      setError("");
      if (otp.length !== 6 || !/^\d+$/.test(otp)) {
        setError("Please enter a valid 6-digit OTP");
        return;
      }
      const email = `${mobileNumber}@fitfusion.com`;
      const formData = new FormData();
      formData.append("email", email);
      formData.append("phone", mobileNumber);
      const customer: any = await sdk.client.fetch(`/store/custom`, {
        method: "POST",
        body: {
          email,
        },
      });
      const state = customer?.data?.customer ? "login" : "register";
      await directLogin(null, formData, state);
      if (typeof window !== "undefined") {
        window.location.replace("/");
      }
    } catch (err) {
      setError("OTP verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleResendOtp = () => {
    setOtp("");
    sendOtp();
  };

  return (
    <div
      className="login-form-home-theme"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0",
      }}
    >
      <div
        className="login-card shadow-lg"
        style={{
          background: "#fff",
          borderRadius: "2rem",
          maxWidth: 900,
          width: "100%",
          overflow: "hidden",
          display: "flex",
        }}
      >
        {/* Left Side - Brand & Features */}
        <div
          className="login-left d-none d-md-flex flex-column justify-content-center align-items-center"
          style={{
            flex: 1.2,
            padding: "3rem 2rem",
            minHeight: "480px",
            position: "relative",
          }}
        >
          <div className="w-100 text-center mb-4">
            <h2
              style={{
                fontWeight: 800,
                fontSize: "2.5rem",
                letterSpacing: "2px",
                color: "#cd8973",
                marginBottom: "0.5rem",
              }}
            >
              FitFusion
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                marginBottom: "2rem",
              }}
            >
              Shop smart. Shop healthy. Shop FitFusion.
            </p>
          </div>
          <div className="w-100">
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
              }}
            >
              <li className="d-flex align-items-center gap-3">
                <span
                  style={{
                    background: "#f6f1ed",
                    color: "#1B5E20",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                  }}
                >
                  <i className="fa fa-bolt"></i>
                </span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                    Fast & Hassle-Free Shopping
                  </div>
                  <div style={{ fontSize: "0.95rem" }}>
                    Experience seamless checkout and quick delivery.
                  </div>
                </div>
              </li>
              <li className="d-flex align-items-center gap-3">
                <span
                  style={{
                    background: "#f6f1ed",
                    color: "#1B5E20",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                  }}
                >
                  <i className="fa fa-tags"></i>
                </span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                    Best Prices Guaranteed
                  </div>
                  <div style={{ fontSize: "0.95rem" }}>
                    Unbeatable deals on all your fitness needs.
                  </div>
                </div>
              </li>
              <li className="d-flex align-items-center gap-3">
                <span
                  style={{
                    background: "#f6f1ed",
                    color: "#1B5E20",
                    borderRadius: "50%",
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                  }}
                >
                  <i className="fa fa-shield-alt"></i>
                </span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                    100% Secure & Spam-Free
                  </div>
                  <div style={{ fontSize: "0.95rem" }}>
                    Your data is protected and never shared.
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        {/* Right Side - Login Form */}
        <div
          className="login-right"
          style={{
            background: "#f6f1ed",
            flex: 1,
            padding: "2.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: 0,
          }}
        >
          {error && (
            <div
              className="alert"
              style={{
                background: "#",
                color: "#c62828",
                border: "1px solid #ffcdd2",
                borderRadius: "0.5rem",
                padding: "0.75rem 1rem",
                marginBottom: "1rem",
                fontWeight: 500,
                fontSize: "1rem",
              }}
              role="alert"
            >
              {error}
            </div>
          )}
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ width: "100%" }}
            autoComplete="off"
          >
            {!showOtpView && (
              <div className="mb-4">
                <label
                  htmlFor="mobileNumber"
                  style={{
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                    display: "block",
                  }}
                >
                  Mobile Number <span style={{ color: "#F9A825" }}>*</span>
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  className="form-control"
                  style={{
                    borderRadius: "0.75rem",
                    padding: "0.75rem 1rem",
                    fontSize: "1.1rem",
                  }}
                  placeholder="Enter your mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit mobile number"
                  required
                  autoFocus
                />
              </div>
            )}

            {showOtpView && (
              <div className="mb-4">
                <label
                  htmlFor="otp"
                  style={{
                    color: "#cd8973",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                    display: "block",
                  }}
                >
                  OTP <span style={{ color: "#cd8973" }}>*</span>
                </label>
                <input
                  type="text"
                  id="otp"
                  className="form-control"
                  style={{
                    borderRadius: "0.75rem",
                    border: "1.5px solid #C8E6C9",
                    padding: "0.75rem 1rem",
                    fontSize: "1.1rem",
                  }}
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={6}
                  pattern="[0-9]{6}"
                  title="Please enter a valid 6-digit OTP"
                  required
                  autoFocus
                />
              </div>
            )}

            {!showOtpView && (
              <button
                type="button"
                style={{
                  background: "#cd8973",
                  color: "#f6f1ed",
                  border: "none",
                  borderRadius: "0.75rem",
                  width: "100%",
                  padding: "0.9rem 0",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  boxShadow: "0 2px 8px rgba(27,94,32,0.08)",
                  transition: "background 0.2s",
                }}
                onClick={sendOtp}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>
                    <i className="fa fa-spinner fa-spin me-2"></i>
                    Sending OTP...
                  </span>
                ) : (
                  "Send OTP"
                )}
              </button>
            )}

            {showOtpView && (
              <button
                type="button"
                style={{
                  background: "#cd8973",
                  color: "#f6f1ed",
                  border: "none",
                  borderRadius: "0.75rem",
                  width: "100%",
                  padding: "0.9rem 0",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  boxShadow: "0 2px 8px rgba(249,168,37,0.08)",
                  marginBottom: "0.5rem",
                  transition: "background 0.2s",
                }}
                onClick={onSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>
                    <i className="fa fa-spinner fa-spin me-2"></i>
                    Verifying OTP...
                  </span>
                ) : (
                  "Verify OTP"
                )}
              </button>
            )}

            {showOtpView && (
              <Timer
                loading={isLoading}
                handleResend={handleResendOtp}
                otpTimeout={otpTimeout}
                setOtpTimeout={setOtpTimeout}
              />
            )}
          </form>

          <div
            className="text-center my-4"
            style={{ position: "relative", width: "100%" }}
          >
            <hr style={{ borderColor: "#C8E6C9" }} />
            <span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#757575",
                padding: "0 1.2rem",
                fontWeight: 600,
                fontSize: "1rem",
                letterSpacing: "1px",
              }}
            >
              OR
            </span>
          </div>

          <p
            className="text-center"
            style={{
              color: "#757575",
              fontSize: "0.98rem",
              marginBottom: "1.2rem",
            }}
          >
            By continuing, you agree to FitFusion's{" "}
            <Link
              href="/privacy-policy"
              style={{
                color: "#cd8973",
                textDecoration: "underline",
                fontWeight: 600,
              }}
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href="/terms-and-condition"
              style={{
                color: "#cd8973",
                textDecoration: "underline",
                fontWeight: 600,
              }}
            >
              Terms & Conditions
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
