"use client";

import { hasProductReview } from "@/lib/data/product";
import { useState } from "react";

const TestPage = () => {
  const [review, setReview] = useState<any>(null);
  const testReview = async () => {
    const review = await hasProductReview();
    console.log(review);
    setReview(review);
  };

  return (
    <div>
      <button onClick={testReview}>Test Review</button>
      <div>
        {review && (
          <div>
            <h1>{review.title}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestPage;
