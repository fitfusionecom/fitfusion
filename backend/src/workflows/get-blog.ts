import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { getBlogStep } from "./steps/get-blog"

export type GetBlogInput = {
  id: string
}

export const getBlogWorkflow = createWorkflow(
  "get-blog",
  (input: GetBlogInput) => {
    const blog = getBlogStep(input)
    return new WorkflowResponse({
      blog,
    })
  }
)
