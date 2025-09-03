import {
  createStep,
  StepResponse,
} from "@medusajs/framework/workflows-sdk"
import { DeleteBlogInput } from "../delete-blog"
import { BLOG_MODULE } from "../../modules/blog"
import BlogModuleService from "../../modules/blog/service"

export const deleteBlogStep = createStep(
  "delete-blog",
  async (
    { id }: DeleteBlogInput,
    { container }
  ) => {
    const query = container.resolve("query")

    // First check if blog exists
    const existingBlog = await query.graph({
      entity: "blog",
      fields: ["id"],
      filters: {
        id,
      },
    })

    if (!existingBlog.data || existingBlog.data.length === 0) {
      throw new Error("Blog not found")
    }

    // Delete the blog using the blog module service
    const blogModuleService: BlogModuleService = container.resolve(BLOG_MODULE)
    await blogModuleService.deleteBlogs({ id })

    return new StepResponse(true)
  }
)
