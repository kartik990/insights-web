"use client";

import { useState } from "react";

export const useUploadImages = () => {
  const [isUploading, setIsUploading] = useState(false);

  const uploadFunc = async (formData: FormData): Promise<string[]> => {
    setIsUploading(true);
    const res = await fetch("/api/upload/", {
      method: "POST",
      body: formData,
    });

    const { links } = await res.json();

    setIsUploading(false);
    return links;
  };

  return { uploadFunc, isUploading };
};
