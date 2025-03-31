"use client";

import { useEffect } from "react";

export default function DynamicTitleHandler() {
  useEffect(() => {
    const originalTitle = document.title;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = "Come back to Sai's Portfolio!";
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.title = originalTitle; // Reset title on unmount
    };
  }, []);

  return null;
}
