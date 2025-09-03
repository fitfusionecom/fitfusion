import {
  MedusaRequest,
  MedusaResponse,
} from "@medusajs/framework/http"
import { BLOG_MODULE } from "../../../../modules/blog"
import BlogModuleService from "../../../../modules/blog/service"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const { slug } = req.params

  const blogModuleService: BlogModuleService = req.scope.resolve(BLOG_MODULE)

  const blog = await blogModuleService.getBlogBySlug(slug)

  if (!blog) {
    res.status(404).json({ message: "Blog not found" })
    return
  }

  res.json(blog)
}
