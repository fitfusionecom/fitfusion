import type {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { z } from "zod"
import { updateBlogWorkflow } from "../../../../workflows/update-blog"

export const PostAdminUpdateBlogsStatusSchema = z.object({
  ids: z.array(z.string()),
  status: z.enum(["draft", "published", "archived"]),
})

export async function POST(
  req: MedusaRequest<z.infer<typeof PostAdminUpdateBlogsStatusSchema>>,
  res: MedusaResponse
) {
  const { ids, status } = req.validatedBody

  const { result } = await updateBlogWorkflow(req.scope).run({
    input: ids.map((id) => ({
      id,
      status,
    })),
  })

  res.json({ blogs: result.blogs })
}
