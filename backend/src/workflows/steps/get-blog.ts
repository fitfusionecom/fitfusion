import {
  createStep,
  StepResponse,
} from "@medusajs/framework/workflows-sdk"
import { GetBlogInput } from "../get-blog"

export const getBlogStep = createStep(
  "get-blog",
  async (
    { id }: GetBlogInput,
    { container }
  ) => {
    const query = container.resolve("query")

    const blog = await query.graph({
      entity: "blog",
      fields: [
        "id",
        "title",
        "subtitle",
        "tags",
        "cover_image",
        "content",
        "author_name",
        "status",
        "slug",
        "created_at",
        "updated_at",
      ],
      filters: {
        id,
      },
    })

    if (!blog.data || blog.data.length === 0) {
      throw new Error("Blog not found")
    }

    return new StepResponse(blog.data[0])
  }
)
