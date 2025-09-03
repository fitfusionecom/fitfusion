import {
  createWorkflow,
  WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { deleteBlogStep } from "./steps/delete-blog"

export type DeleteBlogInput = {
  id: string
}

export const deleteBlogWorkflow = createWorkflow(
  "delete-blog",
  (input: DeleteBlogInput) => {
    const result = deleteBlogStep(input)
    return new WorkflowResponse({
      success: result,
    })
  }
)
