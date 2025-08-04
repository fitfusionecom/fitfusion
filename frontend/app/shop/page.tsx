"use client";

import ShopTemplate from "@/components/shop";
import { useEffect, useState } from "react";

export default function Shop() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div>
        {/* Breadcrumb skeleton */}
        <div className="ayur-bread-section">
          <div className="ayur-breadcrumb-wrapper">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="ayur-bread-content">
                    <div
                      style={{
                        background: "#f3f3f3",
                        height: "32px",
                        width: "100px",
                        borderRadius: "4px",
                        marginBottom: "8px",
                      }}
                    />
                    <div
                      style={{
                        background: "#f3f3f3",
                        height: "16px",
                        width: "200px",
                        borderRadius: "4px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shop content skeleton */}
        <div className="ayur-bgcover ayur-shopsin-sec">
          <div className="container">
            <div className="row">
              {/* Sidebar skeleton */}
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div
                  style={{
                    background: "#f3f3f3",
                    borderRadius: "8px",
                    minHeight: "400px",
                    padding: "20px",
                  }}
                />
              </div>

              {/* Products skeleton */}
              <div className="col-lg-8 col-md-6 col-sm-12">
                <div className="ayur-shopsin-products">
                  <div className="row">
                    {Array.from({ length: 6 }).map((_, idx) => (
                      <div key={idx} className="col-lg-4 col-md-6 col-sm-6">
                        <div
                          style={{
                            background: "#f3f3f3",
                            borderRadius: "8px",
                            minHeight: "320px",
                            marginBottom: "24px",
                            padding: "16px",
                            display: "flex",
                            flexDirection: "column",
                            gap: "12px",
                            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                            animation: "pulse 1.5s infinite",
                          }}
                        >
                          <div
                            style={{
                              background: "#e0e0e0",
                              height: "180px",
                              borderRadius: "6px",
                            }}
                          />
                          <div
                            style={{
                              background: "#e0e0e0",
                              height: "20px",
                              width: "70%",
                              borderRadius: "4px",
                            }}
                          />
                          <div
                            style={{
                              background: "#e0e0e0",
                              height: "16px",
                              width: "50%",
                              borderRadius: "4px",
                            }}
                          />
                          <div
                            style={{
                              background: "#e0e0e0",
                              height: "16px",
                              width: "40%",
                              borderRadius: "4px",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx global>{`
          @keyframes pulse {
            0% {
              opacity: 1;
            }
            50% {
              opacity: 0.6;
            }
            100% {
              opacity: 1;
            }
          }
        `}</style>
      </div>
    );
  }

  return <ShopTemplate />;
}
