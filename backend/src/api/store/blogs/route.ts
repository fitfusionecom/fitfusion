import {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { z } from "zod"
import { BLOG_MODULE } from "../../../modules/blog"
import BlogModuleService from "../../../modules/blog/service"

export const GetStoreBlogsSchema = z.object({
  limit: z.coerce.number().optional().default(10),
  offset: z.coerce.number().optional().default(0),
  tag: z.string().optional(),
  author: z.string().optional(),
  search: z.string().optional(),
})

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {

  const blogModuleService: BlogModuleService = req.scope.resolve(BLOG_MODULE)
  let filters: any = { status: "published" }
  const blogs = await blogModuleService.listBlogsWithFilters(filters)
  res.json({
    blogs
  })
}
