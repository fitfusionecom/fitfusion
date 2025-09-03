import {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { z } from "zod"
import { updateBlogWorkflow } from "../../../../workflows/update-blog"
import { getBlogWorkflow } from "../../../../workflows/get-blog"
import { deleteBlogWorkflow } from "../../../../workflows/delete-blog"

export const PutAdminBlogSchema = z.object({
  title: z.string().min(1).optional(),
  subtitle: z.string().optional(),
  tags: z.array(z.string()).optional(),
  cover_image: z.string().optional(),
  content: z.string().min(1).optional(),
  author_name: z.string().min(1).optional(),
  status: z.enum(["draft", "published", "archived"]).optional(),
  slug: z.string().min(1).optional(),
})

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const { id } = req.params

  try {
    const { result } = await getBlogWorkflow(req.scope).run({
      input: { id },
    })

    res.json(result.blog)
  } catch (error) {
    if (error instanceof Error && error.message === "Blog not found") {
      res.status(404).json({ message: "Blog not found" })
      return
    }
    res.status(500).json({ message: "Internal server error" })
  }
}

export const PUT = async (
  req: MedusaRequest<z.infer<typeof PutAdminBlogSchema>>,
  res: MedusaResponse
) => {
  const { id } = req.params
  const updateData = req.validatedBody

  console.log("updateData", updateData)

  const { result } = await updateBlogWorkflow(req.scope).run({
    input: [{
      id,
      ...updateData,
    }],
  })

  res.json(result.blogs[0])
}

export const DELETE = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const { id } = req.params

  try {
    await deleteBlogWorkflow(req.scope).run({
      input: { id },
    })

    res.status(204).send()
  } catch (error) {
    console.error("Delete error:", error)
    if (error instanceof Error && error.message === "Blog not found") {
      res.status(404).json({ message: "Blog not found" })
      return
    }
    res.status(500).json({ message: "Internal server error" })
  }
}
