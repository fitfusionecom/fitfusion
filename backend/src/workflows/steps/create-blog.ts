import {
  createStep,
  StepResponse,
} from "@medusajs/framework/workflows-sdk"
import { BLOG_MODULE } from "../../modules/blog"
import BlogModuleService from "../../modules/blog/service"

export type CreateBlogStepInput = {
  title: string
  subtitle?: string
  tags?: string[]
  cover_image?: string
  content: string
  author_name: string
  status?: "draft" | "published" | "archived"
  slug: string
}

export const createBlogStep = createStep(
  "create-blog-step",
  async (input: CreateBlogStepInput, { container }) => {
    const blogModuleService: BlogModuleService = container.resolve(
      BLOG_MODULE
    )
    const blog = await blogModuleService.createBlogs({
      ...input,
      tags: input.tags ? JSON.stringify(input.tags) : null,
    })

    return new StepResponse(blog, blog.id)
  },
  async (blogId, { container }) => {
    if (!blogId) {
      return
    }

    const blogModuleService: BlogModuleService = container.resolve(
      BLOG_MODULE
    )

    await blogModuleService.deleteBlogs(blogId)
  }
)
