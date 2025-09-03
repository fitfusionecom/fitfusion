import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { createBlogStep } from "./steps/create-blog"

export type CreateBlogInput = {
  title: string
  subtitle?: string
  tags?: string[]
  cover_image?: string
  content: string
  author_name: string
  status?: "draft" | "published" | "archived"
  slug: string
}

export const createBlogWorkflow = createWorkflow(
  "create-blog",
  (input: CreateBlogInput) => {
    const blog = createBlogStep(input)
    return new WorkflowResponse({
      blog,
    })
  }
)
