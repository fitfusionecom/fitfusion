import { model } from "@medusajs/framework/utils"

const Blog = model.define("blog", {
    id: model.id().primaryKey(),
    title: model.text().nullable(),
    subtitle: model.text().nullable(),
    tags: model.text().nullable(), // JSON string of tags
    cover_image: model.text().nullable(),
    content: model.text().nullable(),
    author_name: model.text().nullable(),
    status: model.enum(["draft", "published", "archived"]).default("draft"),
    slug: model.text().unique().nullable(),
    published_at: model.dateTime().nullable(),
})

export default Blog
