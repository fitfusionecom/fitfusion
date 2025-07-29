"use client";

import { useEffect, useState } from "react";
import { retrieveCustomer } from "@/lib/data/customer";
import AddressBook from "@/components/account/address-book";

export default function AddressesPage() {
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
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "40vh" }}
      >
        <div className="spinner-border text-primary" role="status">
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
    <div className="addresses-page">
      {/* Header */}
      <div className="mb-4">
        <h2 className="mb-2" style={{ color: "#cd8973", fontWeight: 700 }}>
          Addresses
        </h2>
        <p className="text-muted">
          Manage your shipping and billing addresses for faster checkout.
        </p>
      </div>

      {/* Address Book Component */}
      <AddressBook customer={customer} />
    </div>
  );
}
