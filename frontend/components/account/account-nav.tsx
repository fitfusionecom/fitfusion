"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signout } from "@/lib/data/customer";
import {
  FaHome,
  FaUser,
  FaMapMarkerAlt,
  FaShoppingBag,
  FaSignOutAlt,
} from "react-icons/fa";

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
      icon: <FaHome className="icon-sm" />,
      testId: "overview-link",
    },
    {
      href: "/account/profile",
      label: "Profile",
      icon: <FaUser className="icon-sm" />,
      testId: "profile-link",
    },
    {
      href: "/account/addresses",
      label: "Addresses",
      icon: <FaMapMarkerAlt className="icon-sm" />,
      testId: "addresses-link",
    },
    {
      href: "/account/orders",
      label: "Orders",
      icon: <FaShoppingBag className="icon-sm" />,
      testId: "orders-link",
    },
  ];

  return (
    <div className="account-nav">
      {/* Mobile Navigation */}
      <div className="d-md-none mb-4">
        <div className="account-card">
          <div className="account-card-body p-0">
            <div className="p-3 border-bottom">
              <h5 className="profile-section-title mb-0">
                Hello {customer?.first_name || "User"}
              </h5>
            </div>
            <div className="list-group list-group-flush">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`list-group-item d-flex align-items-center gap-3 ${
                    isActive(item.href) ? "active" : ""
                  }`}
                  data-testid={item.testId}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}
              <button
                type="button"
                className="list-group-item logout d-flex align-items-center gap-3"
                onClick={handleLogout}
                data-testid="logout-button"
              >
                <FaSignOutAlt className="icon-sm" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="d-none d-md-block">
        <div className="account-card">
          <div className="account-card-body p-4">
            <div className="mb-4">
              <h5 className="profile-section-title mb-0">Account</h5>
            </div>

            <div className="nav flex-column">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link d-flex align-items-center gap-3 mb-2 ${
                    isActive(item.href) ? "active" : ""
                  }`}
                  data-testid={item.testId}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              ))}

              <button
                type="button"
                className="nav-link logout d-flex align-items-center gap-3 mb-2"
                onClick={handleLogout}
                data-testid="logout-button"
              >
                <FaSignOutAlt className="icon-sm" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
