import { InjectManager, MedusaService, MedusaContext } from "@medusajs/framework/utils"
import Blog from "./models/blog"
import { Context } from "@medusajs/framework/types"
import { EntityManager } from "@mikro-orm/knex"

class BlogModuleService extends MedusaService({
  Blog,
}) {
  @InjectManager()
  async createBlog(
    data: {
      title: string
      subtitle?: string
      tags?: string[]
      cover_image?: string
      content: string
      author_name: string
      status?: "draft" | "published" | "archived"
      slug: string
    },
    @MedusaContext() sharedContext?: Context<EntityManager>
  ): Promise<any> {
    const blogData = {
      ...data,
      tags: data.tags ? JSON.stringify(data.tags) : null,
      published_at: data.status === "published" ? new Date() : null,
    }

    return await this.createBlogs(blogData)
  }

  @InjectManager()
  async updateBlogBatch(
    data: Array<{
      id: string
      title?: string
      subtitle?: string
      tags?: string[]
      cover_image?: string
      content?: string
      author_name?: string
      status?: "draft" | "published" | "archived"
      slug?: string
    }>,
    @MedusaContext() sharedContext?: Context<EntityManager>
  ): Promise<any[]> {
    const updatePromises = data.map(async (blogData) => {
      const updateData: any = {
        ...blogData,
        updated_at: new Date(),
      }

      // Only include tags if they are provided
      if (blogData.tags !== undefined) {
        updateData.tags = blogData.tags ? JSON.stringify(blogData.tags) : null
      }

      // Only include published_at if status is provided
      if (blogData.status !== undefined) {
        updateData.published_at = blogData.status === "published" ? new Date() : null
      }

      const { id, ...rest } = updateData
      return await this.updateBlogs({ id, ...rest })
    })

    return await Promise.all(updatePromises)
  }

  @InjectManager()
  async listBlogsWithFilters(
    filters: {
      id?: string[]
      status?: "draft" | "published" | "archived"
      author_name?: string
      tags?: string[]
    } = {},
    @MedusaContext() sharedContext?: Context<EntityManager>
  ): Promise<any[]> {
    let query = "SELECT * FROM blog WHERE 1=1"
    const params: any[] = []

    if (filters.id && filters.id.length > 0) {
      const placeholders = filters.id.map(() => "?").join(",")
      query += ` AND id IN (${placeholders})`
      params.push(...filters.id)
    }

    if (filters.status) {
      query += " AND status = ?"
      params.push(filters.status)
    }

    if (filters.author_name) {
      query += " AND author_name LIKE ?"
      params.push(`%${filters.author_name}%`)
    }

    if (filters.tags && filters.tags.length > 0) {
      const tagConditions = filters.tags.map(() => "tags LIKE ?").join(" OR ")
      query += ` AND (${tagConditions})`
      filters.tags.forEach(tag => params.push(`%${tag}%`))
    }

    query += " ORDER BY created_at DESC"

    const result = await sharedContext?.manager?.execute(query, params)
    return result?.map((blog: any) => ({
      ...blog,
      tags: blog.tags ? JSON.parse(blog.tags) : [],
    })) || []
  }

  @InjectManager()
  async getBlogBySlug(
    slug: string,
    @MedusaContext() sharedContext?: Context<EntityManager>
  ): Promise<any> {
    const result = await sharedContext?.manager?.execute(
      "SELECT * FROM blog WHERE slug = ? AND status = 'published'",
      [slug]
    )

    if (result?.[0]) {
      return {
        ...result[0],
        tags: result[0].tags ? JSON.parse(result[0].tags) : [],
      }
    }

    return null
  }


}

export default BlogModuleService
