"use client";

import { useState } from "react";
import { HttpTypes } from "@medusajs/types";
import { ChevronDown, ChevronUp } from "lucide-react";
// import RelatedProductsInline from "./related-products-inline";
import "./product-accordion.css";

type ProductAccordionProps = {
  product: HttpTypes.StoreProduct;
  countryCode: string;
};

type AccordionSection = {
  id: string;
  title: string;
  content: React.ReactNode;
};

export default function ProductAccordion({
  product,
  countryCode,
}: ProductAccordionProps) {
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isSectionOpen = (sectionId: string) => openSections.includes(sectionId);

  const accordionSections: AccordionSection[] = [
    {
      id: "description",
      title: "Product Description",
      content: (
        <div className="ayur-product-desc">
          {product.description ? (
            <div
              dangerouslySetInnerHTML={{
                __html: product.description as any,
              }}
            />
          ) : (
            <p>No description available for this product.</p>
          )}
        </div>
      ),
    },
    {
      id: "additional-info",
      title: "Additional Information",
      content: (
        <div className="ayur-product-info">
          <div className="row">
            <div className="col-md-6">
              <h5>Product Details</h5>
              <ul className="list-unstyled">
                <li>
                  <strong>SKU:</strong> {product.handle || "N/A"}
                </li>
                <li>
                  <strong>Type:</strong> {product.type?.value || "N/A"}
                </li>
                <li>
                  <strong>Collection:</strong>{" "}
                  {product.collection?.title || "N/A"}
                </li>
                {product.tags && product.tags.length > 0 && (
                  <li>
                    <strong>Tags:</strong>{" "}
                    {product.tags.map((tag) => tag.value).join(", ")}
                  </li>
                )}
                <li>
                  <strong>Status:</strong>{" "}
                  <span className="badge bg-success">{product.status}</span>
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <h5>Variants & Options</h5>
              <ul className="list-unstyled">
                <li>
                  <strong>Total Variants:</strong>{" "}
                  {product.variants?.length || 0}
                </li>
                {product.options && product.options.length > 0 && (
                  <li>
                    <strong>Available Options:</strong>{" "}
                    {product.options.map((option) => option.title).join(", ")}
                  </li>
                )}
                {product.variants && product.variants.length > 0 && (
                  <li>
                    <strong>Inventory:</strong>{" "}
                    {product.variants.some(
                      (v) => v.inventory_quantity && v.inventory_quantity > 0
                    )
                      ? "In Stock"
                      : "Out of Stock"}
                  </li>
                )}
              </ul>
            </div>
          </div>

          {product.metadata && Object.keys(product.metadata).length > 0 && (
            <div className="mt-4">
              <h5>Additional Specifications</h5>
              <div className="row">
                {Object.entries(product.metadata).map(([key, value]) => (
                  <div key={key} className="col-md-6 mb-2">
                    <strong>{key}:</strong> {String(value)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="ayur-product-accordion">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="accordion" id="productAccordion">
              {accordionSections.map((section) => (
                <div key={section.id} className="accordion-item">
                  <h2 className="accordion-header" id={`heading-${section.id}`}>
                    <button
                      className={`accordion-button ${
                        isSectionOpen(section.id) ? "" : "collapsed"
                      }`}
                      type="button"
                      onClick={() => toggleSection(section.id)}
                      aria-expanded={isSectionOpen(section.id)}
                      aria-controls={`collapse-${section.id}`}
                    >
                      {section.title}
                      {isSectionOpen(section.id) ? (
                        <ChevronUp className="ms-auto" size={20} />
                      ) : (
                        <ChevronDown className="ms-auto" size={20} />
                      )}
                    </button>
                  </h2>
                  <div
                    id={`collapse-${section.id}`}
                    className={`accordion-collapse collapse ${
                      isSectionOpen(section.id) ? "show" : ""
                    }`}
                    aria-labelledby={`heading-${section.id}`}
                    data-bs-parent="#productAccordion"
                  >
                    <div className="accordion-body">{section.content}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
