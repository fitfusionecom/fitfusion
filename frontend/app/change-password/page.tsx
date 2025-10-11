"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "./change-password.css";

// Simple encryption function (same as backend)
function encryptOTP(otp: string): string {
  // Simple base64 encoding with a salt for basic obfuscation
  const salt = "fitfusion-otp-salt-2024";
  const combined = salt + otp;
  return btoa(combined);
}

export default function ChangePasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<"mobile" | "otp" | "password" | "success">(
    "mobile"
  );
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [maskedMobile, setMaskedMobile] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(""); // Store generated OTP

  const handleSendOTP = async () => {
    if (!mobileNumber) {
      setError("Please enter your mobile number");
      return;
    }

    // Validate mobile number format (10 digits)
    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobileNumber)) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Generate OTP locally
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp); // Store OTP in component state

      // Encrypt OTP before sending to API
      const encryptedOtp = encryptOTP(otp);

      // Create email from mobile number
      const email = `${mobileNumber}@fitfusion.com`;

      const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, mobileNumber, otp: encryptedOtp }),
      });

      const result = await response.json();

      if (result.success) {
        setMaskedMobile(result.mobileNumber);
        setStep("otp");
        setSuccess("OTP sent successfully to your WhatsApp!");
      } else {
        setError(result.message || "Failed to send OTP");
      }
    } catch (error) {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Validate OTP locally
      if (otp === generatedOtp) {
        setStep("password");
        setSuccess("OTP verified successfully!");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("Failed to verify OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      setError("Please fill in all password fields");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Call Medusa backend API directly
      const email = `${mobileNumber}@fitfusion.com`;
      const medusaBackendUrl =
        process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
      const publishableApiKey =
        process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY ||
        "pk_3d79b2a10114952d733d9c374c717a6b5610dc865e81dfde5598822f805dd765";

      const response = await fetch(
        `${medusaBackendUrl}/store/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-publishable-api-key": publishableApiKey,
          },
          body: JSON.stringify({ email, newPassword }),
        }
      );

      const result = await response.json();

      if (result.success) {
        setStep("success");
        setSuccess("Password changed successfully!");
      } else {
        setError(result.message || "Failed to change password");
      }
    } catch (error) {
      setError("Failed to change password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = () => {
    setStep("mobile");
    setOtp("");
    setGeneratedOtp(""); // Clear generated OTP
    setError("");
    setSuccess("");
  };

  const handleStartOver = () => {
    setStep("mobile");
    setMobileNumber("");
    setOtp("");
    setNewPassword("");
    setConfirmPassword("");
    setError("");
    setSuccess("");
    setMaskedMobile("");
    setGeneratedOtp(""); // Clear generated OTP
  };

  return (
    <div className="change-password-container">
      <div className="change-password-wrapper">
        <div className="change-password-form-home-theme">
          <div className="change-password-card">
            <div className="change-password-right">
              {/* Progress Steps */}
              <div className="step-container">
                <div className="step-item">
                  <div
                    className={`step-circle ${
                      step === "mobile"
                        ? "active"
                        : ["otp", "password", "success"].includes(step)
                        ? "completed"
                        : ""
                    }`}
                  >
                    1
                  </div>
                  <span className="step-label">Mobile</span>
                </div>
                <div className="step-line"></div>
                <div className="step-item">
                  <div
                    className={`step-circle ${
                      step === "otp"
                        ? "active"
                        : ["password", "success"].includes(step)
                        ? "completed"
                        : ""
                    }`}
                  >
                    2
                  </div>
                  <span className="step-label">OTP</span>
                </div>
                <div className="step-line"></div>
                <div className="step-item">
                  <div
                    className={`step-circle ${
                      step === "password"
                        ? "active"
                        : step === "success"
                        ? "completed"
                        : ""
                    }`}
                  >
                    3
                  </div>
                  <span className="step-label">Password</span>
                </div>
              </div>

              <div className="change-password-header">
                <h5>Change Password</h5>
                <p>Secure password change with WhatsApp OTP verification</p>
              </div>

              {error && (
                <div className="change-password-alert" role="alert">
                  {error}
                </div>
              )}
              {success && (
                <div className="change-password-success" role="alert">
                  {success}
                </div>
              )}

              <form
                className="change-password-form"
                onSubmit={(e) => e.preventDefault()}
              >
                {/* Step 1: Mobile Number */}
                {step === "mobile" && (
                  <>
                    <div className="change-password-form-group">
                      <label
                        htmlFor="mobileNumber"
                        className="change-password-label"
                      >
                        Mobile Number <span className="required">*</span>
                      </label>
                      <input
                        id="mobileNumber"
                        name="mobileNumber"
                        type="tel"
                        maxLength={10}
                        required
                        value={mobileNumber}
                        onChange={(e) =>
                          setMobileNumber(e.target.value.replace(/\D/g, ""))
                        }
                        className="change-password-input"
                        placeholder="Enter your 10-digit mobile number"
                        autoFocus
                      />
                    </div>

                    <button
                      type="button"
                      className="change-password-btn"
                      onClick={handleSendOTP}
                      disabled={loading || mobileNumber.length !== 10}
                    >
                      {loading ? (
                        <span>
                          <i className="fa fa-spinner fa-spin me-2"></i>
                          Sending OTP...
                        </span>
                      ) : (
                        "Send OTP to WhatsApp"
                      )}
                    </button>
                  </>
                )}

                {/* Step 2: OTP Verification */}
                {step === "otp" && (
                  <>
                    <div className="change-password-form-group">
                      <p className="otp-info">
                        We've sent a 6-digit OTP to your WhatsApp number:{" "}
                        <strong>{maskedMobile}</strong>
                      </p>
                      <label htmlFor="otp" className="change-password-label">
                        Enter OTP <span className="required">*</span>
                      </label>
                      <input
                        id="otp"
                        name="otp"
                        type="text"
                        maxLength={6}
                        required
                        value={otp}
                        onChange={(e) =>
                          setOtp(e.target.value.replace(/\D/g, ""))
                        }
                        className="change-password-input otp-input"
                        placeholder="000000"
                        autoFocus
                      />
                    </div>

                    <button
                      type="button"
                      className="change-password-btn"
                      onClick={handleVerifyOTP}
                      disabled={loading || otp.length !== 6}
                    >
                      {loading ? (
                        <span>
                          <i className="fa fa-spinner fa-spin me-2"></i>
                          Verifying...
                        </span>
                      ) : (
                        "Verify OTP"
                      )}
                    </button>

                    <div className="text-center mt-3">
                      <button
                        type="button"
                        className="resend-btn"
                        onClick={handleResendOTP}
                      >
                        Resend OTP
                      </button>
                    </div>
                  </>
                )}

                {/* Step 3: New Password */}
                {step === "password" && (
                  <>
                    <div className="change-password-form-group">
                      <label
                        htmlFor="newPassword"
                        className="change-password-label"
                      >
                        New Password <span className="required">*</span>
                      </label>
                      <input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="change-password-input"
                        placeholder="Enter new password"
                        autoFocus
                      />
                    </div>

                    <div className="change-password-form-group">
                      <label
                        htmlFor="confirmPassword"
                        className="change-password-label"
                      >
                        Confirm Password <span className="required">*</span>
                      </label>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        autoComplete="new-password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="change-password-input"
                        placeholder="Confirm new password"
                      />
                    </div>

                    <button
                      type="button"
                      className="change-password-btn"
                      onClick={handleChangePassword}
                      disabled={loading}
                    >
                      {loading ? (
                        <span>
                          <i className="fa fa-spinner fa-spin me-2"></i>
                          Changing Password...
                        </span>
                      ) : (
                        "Change Password"
                      )}
                    </button>
                  </>
                )}

                {/* Step 4: Success */}
                {step === "success" && (
                  <div className="success-container">
                    <div className="success-icon">
                      <i className="fa fa-check"></i>
                    </div>
                    <h3>Password Changed Successfully!</h3>
                    <p>
                      Your password has been updated successfully. You can now
                      use your new password to log in.
                    </p>

                    <div className="success-buttons">
                      <button
                        type="button"
                        className="change-password-btn"
                        onClick={() => router.push("/login")}
                      >
                        Go to Login
                      </button>
                      <button
                        type="button"
                        className="secondary-btn"
                        onClick={handleStartOver}
                      >
                        Change Another Password
                      </button>
                    </div>
                  </div>
                )}
              </form>

              <p className="change-password-footer">
                <Link href="/login" className="back-to-login">
                  ← Back to Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
