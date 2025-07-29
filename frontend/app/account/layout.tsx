"use client";

import { useEffect, useState } from "react";
import { retrieveCustomer } from "@/lib/data/customer";
import AccountNav from "@/components/account/account-nav";
import Link from "next/link";

interface AccountLayoutProps {
  children: React.ReactNode;
}

export default function AccountLayout({ children }: AccountLayoutProps) {
  const [customer, setCustomer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const customerData = await retrieveCustomer();
        setCustomer(customerData);
      } catch (error) {
        console.error("Error checking auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="card shadow-sm">
              <div className="card-body p-5">
                <h2
                  className="mb-4"
                  style={{ color: "#cd8973", fontWeight: 700 }}
                >
                  Access Denied
                </h2>
                <p className="text-muted mb-4">
                  You need to be logged in to access your account.
                </p>
                <Link href="/login" className="btn btn-primary me-3">
                  Login
                </Link>
                <Link href="/signup" className="btn btn-outline-primary">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="account-layout"
      style={{ minHeight: "100vh", background: "#f6f1ed" }}
    >
      <div className="container py-5">
        <div className="row">
          {/* Sidebar Navigation */}
          <div className="col-lg-3 col-md-4 mb-4">
            <AccountNav customer={customer} />
          </div>

          {/* Main Content */}
          <div className="col-lg-9 col-md-8">
            <div
              className="card shadow-sm"
              style={{ borderRadius: "1rem", border: "none" }}
            >
              <div className="card-body p-4">{children}</div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="row mt-5">
          <div className="col-12">
            <div
              className="card shadow-sm"
              style={{
                borderRadius: "1rem",
                border: "none",
                background: "#fff",
              }}
            >
              <div className="card-body p-4">
                <div className="row align-items-center">
                  <div className="col-md-8">
                    <h4
                      className="mb-2"
                      style={{ color: "#cd8973", fontWeight: 700 }}
                    >
                      Got questions?
                    </h4>
                    <p className="text-muted mb-0">
                      You can find frequently asked questions and answers on our
                      customer service page.
                    </p>
                  </div>
                  <div className="col-md-4 text-md-end">
                    <Link
                      href="/contact"
                      className="btn btn-outline-primary"
                      style={{
                        borderColor: "#cd8973",
                        color: "#cd8973",
                        borderRadius: "0.75rem",
                      }}
                    >
                      Customer Service
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
