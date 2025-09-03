import { useState, useRef, type ChangeEvent, type DragEvent } from "react";
import { Button, Input } from "@medusajs/ui";
import { Upload, X } from "lucide-react";
import { UploadImageOnAWS } from "../lib/image-uploader";

type ImageUploadProps = {
  value?: string;
  onChange: (url: string) => void;
  onUploadStart?: () => void;
  onUploadEnd?: () => void;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
};

const ImageUpload = ({
  value,
  onChange,
  onUploadStart,
  onUploadEnd,
  disabled = false,
  className = "",
  placeholder = "Upload cover image",
}: ImageUploadProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [draggingOver, setDraggingOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (selectedFile.type.startsWith("image/")) {
        handleImageUpload(selectedFile);
      }
    }
  };

  const handleImageUpload = (selectedFile: File) => {
    // Create preview URL
    const previewUrl = URL.createObjectURL(selectedFile);
    setFile(selectedFile);
    setPreview(previewUrl);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraggingOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraggingOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDraggingOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type.startsWith("image/")) {
        handleImageUpload(droppedFile);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    onUploadStart?.();

    try {
      const result = await UploadImageOnAWS(file);
      if (result.url) {
        onChange(result.url);
        // Clean up preview URL
        if (preview) {
          URL.revokeObjectURL(preview);
        }
        setFile(null);
        setPreview(null);
      } else {
        console.error("Upload failed:", result.error);
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
      onUploadEnd?.();
    }
  };

  const handleRemoveImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview(null);
    onChange("");
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  const currentImage = preview || value;

  return (
    <div className={`space-y-2 ${className}`}>
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled}
      />

      {currentImage ? (
        <div className="relative rounded-lg overflow-hidden border">
          <img
            src={currentImage}
            alt="Cover image preview"
            className="w-full h-64 object-cover"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-1.5 hover:bg-black/80"
            disabled={disabled}
          >
            <X className="h-5 w-5" />
          </button>
          {file && (
            <div className="absolute bottom-2 left-2 right-2">
              <Button
                type="button"
                variant="primary"
                size="small"
                onClick={handleUpload}
                disabled={isUploading || disabled}
                className="w-full"
              >
                {isUploading ? "Uploading..." : "Upload Image"}
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            draggingOver
              ? "border-primary bg-primary/5"
              : "border-gray-300 hover:border-primary/70"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={disabled ? undefined : triggerFileInput}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-medium">{placeholder}</h3>
            <p className="text-muted-foreground text-sm mb-2">
              Drag and drop or click to browse
            </p>
            <p className="text-xs text-muted-foreground">
              Recommended size: 1200px x 630px
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
