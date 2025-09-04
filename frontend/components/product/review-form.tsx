"use client";

import { useState, useEffect } from "react";
import { retrieveCustomer } from "@/lib/data/customer";
import { HttpTypes } from "@medusajs/types";
import { addProductReview, hasProductReview } from "@/lib/data/product";
import { FaStar, FaTimes, FaSpinner } from "react-icons/fa";

type ProductReviewsFormProps = {
  productId: string;
  onReviewSubmitted?: () => void;
};

export default function ProductReviewsForm({
  productId,
  onReviewSubmitted,
}: ProductReviewsFormProps) {
  const [customer, setCustomer] = useState<HttpTypes.StoreCustomer | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingReview, setIsCheckingReview] = useState(false);
  const [hasExistingReview, setHasExistingReview] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState(`${productId}`);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (customer) {
      return;
    }

    retrieveCustomer().then(setCustomer);
  }, []);

  // Check if customer has already reviewed this product
  useEffect(() => {
    if (!customer?.id) {
      return;
    }

    const checkExistingReview = async () => {
      setIsCheckingReview(true);
      try {
        const result = await hasProductReview({
          customerId: customer.id,
          productId: productId,
        });
        setHasExistingReview(result.has_review);
      } catch (error) {
        console.error("Error checking existing review:", error);
        // If there's an error, assume no review exists to allow form to show
        setHasExistingReview(false);
      } finally {
        setIsCheckingReview(false);
      }
    };

    checkExistingReview();
  }, [customer?.id, productId]);

  if (!customer) {
    return <></>;
  }

  // Show loading state while checking for existing review
  if (isCheckingReview) {
    return (
      <div className="text-center">
        <div className="d-flex align-items-center justify-content-center">
          <FaSpinner className="fa-spin me-2" />
          <span>Checking for existing review...</span>
        </div>
      </div>
    );
  }

  // If customer has already reviewed, show a message instead of the form
  if (hasExistingReview) {
    return (
      <div className="text-center">
        <div className="alert alert-info d-inline-block" role="alert">
          <FaStar className="me-2" />
          You have already reviewed this product. Thank you for your feedback!
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!content || !rating) {
      setError("Please fill in required fields.");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      await addProductReview({
        title,
        content,
        rating,
        first_name: customer.first_name || "",
        last_name: customer.last_name || "",
        product_id: productId,
      });

      setSuccess("Your review has been submitted and is awaiting approval.");
      setTitle("");
      setContent("");
      setRating(0);

      // Update the has review state since user just submitted a review
      setHasExistingReview(true);

      // Notify parent component that a review was submitted
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }

      // Close form after a short delay to show success message
      setTimeout(() => {
        setShowForm(false);
        setSuccess("");
      }, 2000);
    } catch (err) {
      setError(
        "An error occurred while submitting your review. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setShowForm(false);
    setTitle("");
    setContent("");
    setRating(0);
    setError("");
    setSuccess("");
  };

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  return (
    <div className="product-page-constraint mt-8">
      {/* Add Review Button */}
      {!showForm && (
        <div className="text-center">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            <FaStar className="me-2" />
            Add a Review
          </button>
        </div>
      )}

      {/* Review Form Modal */}
      {showForm && (
        <div className="review-modal-overlay" onClick={handleClose}>
          <div className="review-modal" onClick={(e) => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="review-modal-header">
              <h5 className="review-modal-title">Add a Review</h5>
              <button
                type="button"
                className="review-modal-close"
                onClick={handleClose}
              >
                <FaTimes />
              </button>
            </div>

            {/* Error and Success Messages */}
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            {success && (
              <div className="alert alert-success" role="alert">
                {success}
              </div>
            )}

            {/* Review Form */}
            <form onSubmit={handleSubmit} className="review-form">
              {/* <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="form-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter review title (optional)"
                />
              </div> */}

              <div className="mb-3">
                <label htmlFor="content" className="form-label">
                  Review <span className="text-danger">*</span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  className="form-input"
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your experience with this product..."
                  required
                />
              </div>

              <div className="mb-4">
                <label className="form-label">
                  Rating <span className="text-danger">*</span>
                </label>
                <div className="rating-stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`rating-star ${
                        rating >= index + 1 ? "active" : ""
                      }`}
                      onClick={() => handleStarClick(index + 1)}
                    >
                      <FaStar />
                    </button>
                  ))}
                </div>
                {rating > 0 && (
                  <small className="text-muted mt-1 d-block">
                    You rated this product {rating} out of 5 stars
                  </small>
                )}
              </div>

              {/* Form Actions */}
              <div className="d-flex gap-2">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <FaSpinner className="fa-spin me-2" />
                      Submitting...
                    </>
                  ) : (
                    "Submit Review"
                  )}
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={handleClose}
                  disabled={isLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Styles */}
      <style jsx>{`
        .review-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1050;
          padding: 20px;
          animation: fadeIn 0.2s ease-out;
        }

        .review-modal {
          background: #ffffff;
          border-radius: 1rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
          max-width: 500px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideIn 0.3s ease-out;
        }

        .review-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 1.5rem 1rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .review-modal-title {
          color: #1a1a1a;
          font-weight: 700;
          font-size: 1.25rem;
          margin: 0;
        }

        .review-modal-close {
          background: transparent;
          border: none;
          color: #6b7280;
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
        }

        .review-modal-close:hover {
          background: #f3f4f6;
          color: #374151;
        }

        .review-form {
          padding: 1rem 1.5rem 1.5rem;
        }

        .rating-stars {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .rating-star {
          background: transparent;
          border: none;
          color: #d1d5db;
          font-size: 1.5rem;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 0.25rem;
          transition: all 0.2s ease;
        }

        .rating-star:hover {
          color: #fbbf24;
          transform: scale(1.1);
        }

        .rating-star.active {
          color: #fbbf24;
        }

        .form-label {
          color: #374151;
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .form-input {
          border-radius: 0.75rem;
          padding: 0.875rem 1rem;
          font-size: 1rem;
          border: 2px solid #e5e7eb;
          width: 100%;
          transition: all 0.2s ease;
          background: #fafafa;
          color: #1f2937;
        }

        .form-input:focus {
          outline: none;
          border-color: #1a1a1a;
          background: #ffffff;
          box-shadow: 0 0 0 3px rgba(26, 26, 26, 0.1);
        }

        .form-input::placeholder {
          color: #9ca3af;
          font-weight: 400;
        }

        .btn-primary {
          background: #1a1a1a;
          color: #ffffff;
          border: none;
          border-radius: 0.75rem;
          padding: 0.875rem 1.5rem;
          font-weight: 600;
          font-size: 0.95rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .btn-primary:hover {
          background: #000000;
          transform: translateY(-2px);
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
        }

        .btn-outline {
          background: transparent;
          color: #1a1a1a;
          border: 2px solid #1a1a1a;
          border-radius: 0.75rem;
          padding: 0.875rem 1.5rem;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .btn-outline:hover {
          background: #1a1a1a;
          color: #ffffff;
          transform: translateY(-2px);
        }

        .alert {
          padding: 0.75rem 1rem;
          margin-bottom: 1rem;
          border-radius: 0.5rem;
          border: 1px solid transparent;
        }

        .alert-danger {
          color: #721c24;
          background-color: #f8d7da;
          border-color: #f5c6cb;
        }

        .alert-success {
          color: #155724;
          background-color: #d4edda;
          border-color: #c3e6cb;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (max-width: 576px) {
          .review-modal {
            margin: 10px;
            max-height: calc(100vh - 20px);
          }

          .review-modal-header {
            padding: 1rem 1rem 0.75rem;
          }

          .review-form {
            padding: 0.75rem 1rem 1rem;
          }
        }
      `}</style>
    </div>
  );
}
