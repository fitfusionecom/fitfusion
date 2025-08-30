"use client";

import "./LoginForm.css";
import Link from "next/link";
import Timer from "./timer";
import { useState } from "react";
import { sdk } from "@/lib/config";
import { directLogin } from "@/lib/data/customer";

export default function LoginForm() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpTimeout, setOtpTimeout] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [showOtpView, setShowOtpView] = useState(false);

  async function sendOtp() {
    try {
      setIsLoading(true);
      setError("");

      if (mobileNumber.length !== 10 || !/^\d+$/.test(mobileNumber)) {
        setError("Please enter a valid 10-digit mobile number");
        return;
      }
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
    <div className="login-form-home-theme">
      <div className="login-card shadow-lg----">
        {/* Right Side - Login Form */}
        <div className="login-right">
          <div className="login-header">
            <h5>Login</h5>
            <p>Get access to your Orders, Wishlist and Recommendations</p>
          </div>

          {error && (
            <div className="login-alert" role="alert">
              {error}
            </div>
          )}
          <form
            className="login-form"
            onSubmit={(e) => e.preventDefault()}
            autoComplete="off"
          >
            {!showOtpView && (
              <div className="login-form-group">
                <label htmlFor="mobileNumber" className="login-label">
                  Mobile Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="mobileNumber"
                  className="login-input"
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
              <div className="login-form-group">
                <label htmlFor="otp" className="login-label">
                  OTP <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="otp"
                  className="login-input otp-input"
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
                className="login-btn"
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
                className="login-btn"
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

          <div className="login-divider">
            <hr />
            <span className="divider-text">OR</span>
          </div>

          <p className="login-footer">
            By continuing, you agree to FitFusion's{" "}
            <Link href="/privacy">Privacy Policy</Link> and{" "}
            <Link href="/terms">Terms & Conditions</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
