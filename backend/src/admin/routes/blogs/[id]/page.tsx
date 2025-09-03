import { defineRouteConfig } from "@medusajs/admin-sdk";
import { DocumentText } from "@medusajs/icons";
import { Container, Heading, Button, Input, Label, toast } from "@medusajs/ui";
import MDEditor from "@uiw/react-md-editor";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { sdk } from "../../../lib/config";
import ImageUpload from "../../../components/ImageUpload";

type BlogData = {
  title: string;
  subtitle: string;
  tags: any;
  cover_image: string;
  content: string;
  author_name: string;
  status: "draft" | "published" | "archived";
  slug: string;
};

const EditBlogPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState<BlogData>({
    title: "",
    subtitle: "",
    tags: [],
    cover_image: "",
    content: "",
    author_name: "",
    status: "draft",
    slug: "",
  });

  const [tagInput, setTagInput] = useState("");

  // Fetch blog data
  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: () => sdk.client.fetch(`/admin/blogs/${id}`) as Promise<BlogData>,
    enabled: !!id,
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: (data: any) =>
      sdk.client.fetch(`/admin/blogs/${id}`, {
        method: "PUT",
        body: data,
      }),
    onSuccess: () => {
      toast.success("Blog updated successfully");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blog", id] });
    },
    onError: () => {
      toast.error("Failed to update blog");
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: () =>
      sdk.client.fetch(`/admin/blogs/${id}`, {
        method: "DELETE",
      }),
    onSuccess: () => {
      toast.success("Blog deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/blogs");
    },
    onError: () => {
      toast.error("Failed to delete blog");
    },
  });

  // Load blog data into form
  useEffect(() => {
    if (blog) {
      console.log("Loading blog data:", blog);
      setFormData({
        title: blog.title || "",
        subtitle: blog.subtitle || "",
        tags: blog.tags ? blog.tags.split(",") : [],
        cover_image: blog.cover_image || "",
        content: blog.content || "",
        author_name: blog.author_name || "",
        status: blog.status || "draft",
        slug: blog.slug || "",
      });
    }
  }, [blog]);

  const handleInputChange = (field: string, value: string) => {
    // Auto-generate slug from title
    if (field === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setFormData((prev) => ({ ...prev, [field]: value, slug }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
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
      tags: prev.tags.filter((tag: any) => tag !== tagToRemove),
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

    // Ensure tags is always an array
    const submitData = {
      ...formData,
      tags: Array.isArray(formData.tags) ? formData.tags : [],
    };

    console.log("Submitting data:", submitData);
    updateMutation.mutate(submitData);
  };

  const handleDelete = () => {
    if (
      confirm(
        "Are you sure you want to delete this blog? This action cannot be undone."
      )
    ) {
      deleteMutation.mutate();
    }
  };

  if (isLoading || updateMutation.isPending || deleteMutation.isPending) {
    return (
      <Container>
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
        </div>
      </Container>
    );
  }

  if (!blog) {
    return (
      <Container>
        <div className="text-center py-8">
          <p className="text-gray-500">Blog not found</p>
          <Button onClick={() => navigate("/blogs")} className="mt-4">
            Back to Blogs
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex items-center justify-between mb-6">
        <Heading>Edit Blog</Heading>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => navigate("/blogs")}>
            Back to Blogs
          </Button>
          <Button
            variant="danger"
            onClick={handleDelete}
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? "Deleting..." : "Delete Blog"}
          </Button>
        </div>
      </div>

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
              onChange={(e) => handleInputChange("author_name", e.target.value)}
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
                  status: e.target.value as "draft" | "published" | "archived",
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
            disabled={updateMutation.isPending || deleteMutation.isPending}
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
          {formData?.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {formData?.tags?.map((tag: any, index: any) => (
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
            onClick={() => navigate("/blogs")}
            disabled={updateMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={updateMutation.isPending}
          >
            {updateMutation.isPending ? "Updating..." : "Update Blog"}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "Edit Blog",
  icon: DocumentText,
});

export default EditBlogPage;
