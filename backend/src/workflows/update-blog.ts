import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { updateBlogStep } from "./steps/update-blog"

export type UpdateBlogInput = {
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

export const updateBlogWorkflow = createWorkflow(
  "update-blog",
  (input: UpdateBlogInput[]) => {
    const blogs = updateBlogStep(input)
    return new WorkflowResponse({
      blogs,
    })
  }
)
