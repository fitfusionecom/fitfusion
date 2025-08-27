"use client";

import { useEffect, useState } from "react";
import { retrieveCustomer } from "@/lib/data/customer";
import ProfileName from "@/components/account/profile-name";
import ProfilePhone from "@/components/account/profile-phone";
import ProfileBillingAddress from "@/components/account/profile-billing-address";

export default function ProfilePage() {
  const [customer, setCustomer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCustomer = async () => {
      try {
        const customerData = await retrieveCustomer();
        setCustomer(customerData);
      } catch (error) {
        console.error("Error loading customer:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCustomer();
  }, []);

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner-border loading-spinner" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="text-center py-5">
        <h4 className="text-muted">Customer not found</h4>
      </div>
    );
  }

  return (
    <div className="profile-page">
      {/* Header */}
      <div className="mb-4">
        <h2 className="account-header mb-2">Profile</h2>
        <p className="account-header">
          View and update your profile information, including your name, phone
          number, and billing address. You can also change your password.
        </p>
      </div>

      {/* Profile Sections */}
      <div className="profile-sections">
        <ProfileName customer={customer} />

        <div className="divider my-4"></div>

        <ProfilePhone customer={customer} />

        <div className="divider my-4"></div>

        <ProfileBillingAddress customer={customer} />
      </div>
    </div>
  );
}

// Divider component
const Divider = () => {
  return (
    <div
      className="w-100"
      style={{
        height: "1px",
        background: "#e9ecef",
        margin: "2rem 0",
      }}
    />
  );
};
