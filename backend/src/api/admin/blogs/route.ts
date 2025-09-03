import {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { createFindParams } from "@medusajs/medusa/api/utils/validators"
import { z } from "zod"
import { createBlogWorkflow } from "../../../workflows/create-blog"
import { getBlogsWorkflow } from "../../../workflows/get-blogs"

export const GetAdminBlogsSchema = createFindParams().extend({
  status: z.enum(["draft", "published", "archived"]).optional(),
  author_name: z.string().optional(),
  tags: z.union([z.string(), z.array(z.string())]).optional(),
})

export const PostAdminBlogSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string().optional(),
  tags: z.array(z.string()).optional(),
  cover_image: z.string().optional(),
  content: z.string().min(1),
  author_name: z.string().min(1),
  status: z.enum(["draft", "published", "archived"]).default("draft"),
  slug: z.string().min(1),
})

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const validatedQuery = GetAdminBlogsSchema.parse(req.query)
  const { limit, offset, status, author_name, tags } = validatedQuery

  const { result } = await getBlogsWorkflow(req.scope).run({
    input: {
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      status,
      author_name,
      tags: tags ? (Array.isArray(tags) ? tags : [tags]) : undefined,
    },
  })

  res.json(result)
}

export const POST = async (
  req: MedusaRequest<z.infer<typeof PostAdminBlogSchema>>,
  res: MedusaResponse
) => {
  const { title, subtitle, tags, cover_image, content, author_name, status, slug } = req.validatedBody

  const { result } = await createBlogWorkflow(req.scope).run({
    input: {
      title,
      subtitle,
      tags,
      cover_image,
      content,
      author_name,
      status,
      slug,
    },
  })

  res.json(result.blog)
}
