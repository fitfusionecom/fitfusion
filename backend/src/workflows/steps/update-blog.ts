import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { BLOG_MODULE } from "../../modules/blog"
import BlogModuleService from "../../modules/blog/service"

export type UpdateBlogStepInput = {
  id: string
  title?: string
  subtitle?: string
  tags?: string[]
  cover_image?: string
  content?: string
  author_name?: string
  status?: "draft" | "published" | "archived"
  slug?: string
}

export const updateBlogStep = createStep(
  "update-blog-step",
  async (input: UpdateBlogStepInput[], { container }) => {
    const blogModuleService: BlogModuleService = container.resolve(
      BLOG_MODULE
    )

    console.log("input", input)


    // Convert tags array to comma-separated string as required by updateBlogs
    // Also, await all updates in parallel and return the results if needed
    const updatePromises = input.map((blog) => {
      return blogModuleService.updateBlogs({
        id: blog.id,
        author_name: blog.author_name,
        title: blog.title,
        subtitle: blog.subtitle,
        tags: blog.tags ? blog.tags.join(",") : undefined,
        cover_image: blog.cover_image,
        content: blog.content,
        status: blog.status,
        slug: blog.slug,
      });
    });
    const blogs = await Promise.all(updatePromises);

    return new StepResponse(blogs)
  }
)
