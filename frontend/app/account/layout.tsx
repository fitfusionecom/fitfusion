"use client";

import { useEffect, useState } from "react";
import { retrieveCustomer } from "@/lib/data/customer";
import AccountNav from "@/components/account/account-nav";
import Link from "next/link";
import "./account-page.css";

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
      <div className="loading-container" style={{ minHeight: "60vh" }}>
        <div className="spinner-border loading-spinner" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="account-container">
        <div className="container py-5 mt-5">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
              <div className="account-card">
                <div className="account-card-body p-5">
                  <h2 className="account-header mb-4">Access Denied</h2>
                  <p className="account-header mb-4">
                    You need to be logged in to access your account.
                  </p>
                  <Link href="/login" className="btn btn-outline me-3">
                    Login
                  </Link>

                  {/* <Link href="/signup" className="btn btn-outline-primary">
                  Sign Up
                </Link> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="account-layout">
      <div className="account-container">
        <div className="container">
          <div className="row">
            {/* Sidebar Navigation */}
            <div className="col-lg-3 col-md-4 mb-4">
              <AccountNav customer={customer} />
            </div>

            {/* Main Content */}
            <div className="col-lg-9 col-md-8">
              <div className="account-card">
                <div className="account-card-body">{children}</div>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="account-card">
                <div className="account-card-body">
                  <div className="row align-items-center">
                    <div className="col-md-8">
                      <h4 className="account-header mb-2">Got questions?</h4>
                      <p className="account-header mb-0">
                        You can find frequently asked questions and answers on
                        our customer service page.
                      </p>
                    </div>
                    <div className="col-md-4 text-md-end">
                      <Link href="/contact" className="btn btn-outline">
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
    </div>
  );
}
