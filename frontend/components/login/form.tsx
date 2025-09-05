"use client";

import "./LoginForm.css";
import Link from "next/link";
import { useState } from "react";
import { sdk } from "@/lib/config";
import { directLogin } from "@/lib/data/customer";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  async function onSubmit() {
    try {
      setIsLoading(true);
      setError("");

      if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        setIsLoading(false);
        return;
      }

      const email = `${mobileNumber}@fitfusion.com`;
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", mobileNumber);

      const customer: any = await sdk.client.fetch(`/store/custom`, {
        method: "POST",
        body: {
          email,
        },
      });
      const state = customer?.data?.customer ? "login" : "register";
      const response = await directLogin(null, formData, state);

      if (response && response.includes("Error:")) {
        throw new Error(response.replace("Error: ", ""));
      } else {
        window.location.replace("/account");
      }
    } catch (err) {
      console.log("err: ", err);
      setError(err.toString());
    } finally {
      setIsLoading(false);
    }
  }

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

            <div className="login-form-group">
              <label htmlFor="otp" className="login-label">
                Password <span className="required">*</span>
              </label>
              <input
                type="text"
                id="otp"
                className="login-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                maxLength={16}
                title="Please enter a valid password"
                required
                autoFocus
              />
            </div>

            <button
              type="button"
              className="login-btn"
              onClick={onSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <span>
                  <i className="fa fa-spinner fa-spin me-2"></i>
                  Submitting...
                </span>
              ) : (
                "Submit"
              )}
            </button>
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
