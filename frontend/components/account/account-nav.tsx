"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signout } from "@/lib/data/customer";

interface AccountNavProps {
  customer: any;
}

export default function AccountNav({ customer }: AccountNavProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    await signout("in");
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navItems = [
    {
      href: "/account",
      label: "Overview",
      icon: "fa fa-home",
      testId: "overview-link",
    },
    {
      href: "/account/profile",
      label: "Profile",
      icon: "fa fa-user",
      testId: "profile-link",
    },
    {
      href: "/account/addresses",
      label: "Addresses",
      icon: "fa fa-map-marker-alt",
      testId: "addresses-link",
    },
    {
      href: "/account/orders",
      label: "Orders",
      icon: "fa fa-shopping-bag",
      testId: "orders-link",
    },
  ];

  return (
    <div className="account-nav">
      {/* Mobile Navigation */}
      <div className="d-md-none mb-4">
        <div
          className="card shadow-sm"
          style={{ borderRadius: "1rem", border: "none" }}
        >
          <div className="card-body p-0">
            <div
              className="p-3 border-bottom"
              style={{ background: "#f6f1ed" }}
            >
              <h5
                className="mb-0"
                style={{ color: "#cd8973", fontWeight: 700 }}
              >
                Hello {customer?.first_name || "User"}
              </h5>
            </div>
            <div className="list-group list-group-flush">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`list-group-item list-group-item-action d-flex align-items-center gap-3 ${
                    isActive(item.href) ? "active" : ""
                  }`}
                  style={{
                    border: "none",
                    padding: "1rem 1.5rem",
                    color: isActive(item.href) ? "#fff" : "#333",
                    background: isActive(item.href) ? "#cd8973" : "transparent",
                    textDecoration: "none",
                  }}
                  data-testid={item.testId}
                >
                  <i className={item.icon} style={{ width: "20px" }}></i>
                  <span>{item.label}</span>
                </Link>
              ))}
              <button
                type="button"
                className="list-group-item list-group-item-action d-flex align-items-center gap-3"
                style={{
                  border: "none",
                  padding: "1rem 1.5rem",
                  background: "transparent",
                  color: "#dc3545",
                  width: "100%",
                  textAlign: "left",
                }}
                onClick={handleLogout}
                data-testid="logout-button"
              >
                <i className="fa fa-sign-out-alt" style={{ width: "20px" }}></i>
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="d-none d-md-block">
        <div
          className="card shadow-sm"
          style={{ borderRadius: "1rem", border: "none" }}
        >
          <div className="card-body p-4">
            <div className="mb-4">
              <h5
                className="mb-0"
                style={{ color: "#cd8973", fontWeight: 700 }}
              >
                Account
              </h5>
            </div>

            <div className="nav flex-column">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link d-flex align-items-center gap-3 mb-2 ${
                    isActive(item.href) ? "active" : ""
                  }`}
                  style={{
                    padding: "0.75rem 1rem",
                    borderRadius: "0.5rem",
                    color: isActive(item.href) ? "#fff" : "#666",
                    background: isActive(item.href) ? "#cd8973" : "transparent",
                    textDecoration: "none",
                    fontWeight: isActive(item.href) ? "600" : "400",
                    transition: "all 0.2s ease",
                  }}
                  data-testid={item.testId}
                >
                  <i className={item.icon} style={{ width: "20px" }}></i>
                  <span>{item.label}</span>
                </Link>
              ))}

              <button
                type="button"
                className="nav-link d-flex align-items-center gap-3 mb-2"
                style={{
                  padding: "0.75rem 1rem",
                  borderRadius: "0.5rem",
                  color: "#dc3545",
                  background: "transparent",
                  border: "none",
                  width: "100%",
                  textAlign: "left",
                  fontWeight: "400",
                  transition: "all 0.2s ease",
                }}
                onClick={handleLogout}
                data-testid="logout-button"
              >
                <i className="fa fa-sign-out-alt" style={{ width: "20px" }}></i>
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
