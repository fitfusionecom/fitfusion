import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { Container, Heading, Button, Input, Divider } from "@medusajs/ui";
import { AdminProduct, DetailWidgetProps } from "@medusajs/types";
import { UploadImageOnAWS } from "../lib/image-uploader";

import ReactQuill from "react-quill";
import { sdk } from "../lib/config";
import "react-quill/dist/quill.snow.css";
import { useState, useEffect, ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { X } from "lucide-react";

// The widget
const ProductWidget = ({ data }: DetailWidgetProps<AdminProduct>) => {
  const {
    data: info_response,
    isLoading,
    refetch,
  } = useQuery({
    queryFn: async () => {
      const info = (await sdk.client.fetch(`/info?product_id=${data.id}`, {
        method: "GET",
      })) as any;
      return info.info.length > 0 ? info.info[0] : null;
    },
    queryKey: ["info", data.id],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [desc1, setDesc1] = useState("");
  const [desc2, setDesc2] = useState("");
  const [desc3, setDesc3] = useState("");
  const [showFileInput, setShowFileInput] = useState(false);

  // Update state when info_response changes
  useEffect(() => {
    if (info_response) {
      setDesc1(info_response.desc1 || "");
      setDesc2(info_response.desc2 || "");
      setDesc3(info_response.desc3 || "");
      setFilePreview(info_response.banner || null);
    } else {
      setDesc1("");
      setDesc2("");
      setDesc3("");
      setFilePreview(null);
    }
    setShowFileInput(false); // Reset file input UI when info changes
  }, [info_response]);

  const handleSave = async () => {
    try {
      let banner = info_response?.banner || "n/a";
      if (file) {
        const res = await UploadImageOnAWS(file);
        banner = res?.url || "n/a";
      }

      setIsSubmitting(true);
      await sdk.client.fetch(`/info`, {
        method: "POST",
        body: {
          product_id: data.id,
          desc1: desc1,
          desc2: desc2,
          desc3: desc3,
          banner: banner,
        },
      });
      setShowFileInput(false);
      setFile(null);
    } catch (error) {
      console.error("Failed to save:", error);
    } finally {
      setIsSubmitting(false);
      refetch();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setFile(file);
      setFilePreview(previewUrl);
    }
  };

  const handleRemoveImage = () => {
    setFile(null);
    setFilePreview(null);
    setShowFileInput(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="divide-y space-y-5 p-5">
      <div className="flex items-center justify-between">
        <Heading level="h2">Info Editor</Heading>
      </div>

      <ReactQuill theme="snow" value={desc1} onChange={setDesc1} />
      <ReactQuill theme="snow" value={desc2} onChange={setDesc2} />
      <ReactQuill theme="snow" value={desc3} onChange={setDesc3} />

      <div className="px-6 pb-6">
        <div className="flex flex-col gap-2 mb-4 items-center">
          {/* If there is an image, show it and option to replace */}
          {(filePreview || info_response?.banner) && !showFileInput ? (
            <div className="relative w-full flex flex-col items-center">
              <img
                src={filePreview || info_response?.banner}
                className="w-full h-64 object-cover"
                alt="Banner"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5"
                title="Replace image"
              >
                <X className="h-5 w-5" />
              </button>
              <Button
                variant="secondary"
                size="small"
                className="mt-2"
                onClick={() => setShowFileInput(true)}
              >
                Replace Image
              </Button>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center">
              <Input type="file" accept="image/*" onChange={handleFileChange} />
              {filePreview && (
                <img
                  src={filePreview}
                  className="w-full h-64 object-cover mt-2"
                  alt="Preview"
                />
              )}
              <Button
                variant="primary"
                size="small"
                className="mt-2"
                onClick={handleSave}
                isLoading={isSubmitting}
                disabled={!file}
              >
                Upload Banner
              </Button>
            </div>
          )}
        </div>
      </div>
      <Button disabled={isSubmitting} onClick={() => handleSave()}>
        {isSubmitting ? "..." : "Save"}
      </Button>
    </Container>
  );
};

// The widget's configurations
export const config = defineWidgetConfig({
  zone: "product.details.after",
});

export default ProductWidget;
