import {
    createWorkflow,
    WorkflowResponse,
} from "@medusajs/framework/workflows-sdk"
import { getBlogsStep } from "./steps/get-blogs"

export type GetBlogsInput = {
    limit?: number
    offset?: number
    status?: "draft" | "published" | "archived"
    author_name?: string
    tags?: string[]
}

export const getBlogsWorkflow = createWorkflow(
    "get-blogs",
    (input: GetBlogsInput) => {
        const blogs = getBlogsStep(input)
        return new WorkflowResponse(blogs)
    }
)
