import {
    createStep,
    StepResponse,
} from "@medusajs/framework/workflows-sdk"
import { GetBlogsInput } from "../get-blogs"
import { BLOG_MODULE } from "../../modules/blog"
import BlogModuleService from "../../modules/blog/service"

export const getBlogsStep = createStep(
    "get-blogs",
    async (
        {
            limit = 20,
            offset = 0,
            status,
            author_name,
            tags,
        }: GetBlogsInput,
        { container }
    ) => {
        const blogModuleService: BlogModuleService = container.resolve(
            BLOG_MODULE
        )
        const blog = await blogModuleService.listBlogs()
        return new StepResponse({
            blogs: blog,
            count: blog.length,
            limit,
            offset,
        })
    }
)
