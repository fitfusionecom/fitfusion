"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="ayur-loader">
      <div className="ayur-spin">
        <Image
          src="/assets/images/loader.gif"
          alt="loader"
          width={50}
          height={50}
        />
      </div>
    </div>
  );
}
