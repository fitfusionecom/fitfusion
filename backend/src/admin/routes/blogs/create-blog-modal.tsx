import { useState } from "react";
import { sdk } from "../../lib/config";
import MDEditor from "@uiw/react-md-editor";
import ImageUpload from "../../components/ImageUpload";
import { FocusModal, Button, Input, Label, toast } from "@medusajs/ui";

type CreateBlogModalProps = {
  onClose: () => void;
  onSuccess: () => void;
};

const CreateBlogModal = ({ onClose, onSuccess }: CreateBlogModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    tags: [] as string[],
    cover_image: "",
    content: "",
    author_name: "",
    status: "draft" as "draft" | "published" | "archived",
    slug: "",
  });

  const [tagInput, setTagInput] = useState("");

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Auto-generate slug from title
    if (field === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.content ||
      !formData.author_name ||
      !formData.slug
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    try {
      // Prepare data to match edit page format
      const submitData = {
        ...formData,
        tags: formData.tags,
      };

      console.log("Submitting data:", submitData);

      await sdk.client.fetch("/admin/blogs", {
        method: "POST",
        body: submitData,
      });

      toast.success("Blog created successfully");
      onSuccess();
    } catch (error) {
      console.error("Error creating blog:", error);
      toast.error("Failed to create blog");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FocusModal open onOpenChange={onClose}>
      <FocusModal.Content className="w-full h-full max-w-none max-h-none overflow-y-auto p-6">
        <FocusModal.Header>
          <FocusModal.Title>Create New Blog</FocusModal.Title>
        </FocusModal.Header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter blog title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => handleInputChange("subtitle", e.target.value)}
                placeholder="Enter blog subtitle"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="author_name">Author Name *</Label>
              <Input
                id="author_name"
                value={formData.author_name}
                onChange={(e) =>
                  handleInputChange("author_name", e.target.value)
                }
                placeholder="Enter author name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.value as
                      | "draft"
                      | "published"
                      | "archived",
                  }))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              value={formData.slug}
              onChange={(e) => handleInputChange("slug", e.target.value)}
              placeholder="blog-post-url"
              required
            />
            <p className="text-sm text-gray-500">
              URL-friendly version of the title
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover_image">Cover Image</Label>
            <ImageUpload
              value={formData.cover_image}
              onChange={(url) => handleInputChange("cover_image", url)}
              disabled={isLoading}
              placeholder="Upload cover image"
            />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Enter tag"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button
                type="button"
                variant="secondary"
                onClick={handleAddTag}
                disabled={!tagInput.trim()}
              >
                Add
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content *</Label>
            <div data-color-mode="light">
              <MDEditor
                value={formData.content}
                onChange={(value) => handleInputChange("content", value || "")}
                height={400}
                data-color-mode="light"
              />
            </div>
            <p className="text-sm text-gray-500">
              Use the markdown editor to create rich content with formatting,
              links, images, and more
            </p>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Blog"}
            </Button>
          </div>
        </form>
      </FocusModal.Content>
    </FocusModal>
  );
};

export default CreateBlogModal;
