import {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/framework/http"
import { z } from "zod"
import axios from "axios"

export const SendWhatsAppMessageSchema = z.object({
    to: z.string().min(1, "Phone number is required"),
    templateName: z.string().min(1, "Template name is required"),
    bodyParameters: z.array(z.object({
        type: z.string(),
        text: z.string(),
    })).min(1, "Body parameters are required"),
})

export const POST = async (
    req: MedusaRequest<z.infer<typeof SendWhatsAppMessageSchema>>,
    res: MedusaResponse
) => {
    try {
        const validatedBody = SendWhatsAppMessageSchema.parse(req.body)
        const { to, templateName, bodyParameters } = validatedBody

        const body = {
            key: "5b3acc6fcb52468091f9792a1543d444",
            to: to,
            languageCode: "en",
            TemplateName: templateName,
            headertype: "image",
            link: "https://www.xyz.com//Files/b4063f333fdec6.jpeg",
            filename: "",
            headertext: "",
            BodyParameter: bodyParameters,
        }

        const response = await axios.post(
            "https://waba2waba.com/api/v1/sendTemplateMessage",
            body,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )

        res.json({
            success: true,
            message: "WhatsApp message sent successfully",
            data: response.data,
        })
    } catch (error) {
        console.error("Error sending WhatsApp message:", error)

        res.status(500).json({
            success: false,
            message: "Failed to send WhatsApp message",
            error: error instanceof Error ? error.message : String(error),
        })
    }
}
