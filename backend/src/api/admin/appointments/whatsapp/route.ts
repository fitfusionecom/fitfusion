import {
    MedusaRequest,
    MedusaResponse,
} from "@medusajs/framework/http"
import { z } from "zod"

import { WhatsAppService, createWhatsAppService, WhatsAppTemplate } from "../../../../utils/whatsapp-service"

export const SendWhatsAppMessageSchema = z.object({
    to: z.string().min(1, "Phone number is required"),
    templateName: z.string().min(1, "Template name is required"),
    bodyParameters: z.array(z.object({
        type: z.string(),
        text: z.string(),
    })).min(1, "Body parameters are required"),
    headerType: z.enum(["image", "text"]).optional(),
    headerText: z.string().optional(),
    headerImageUrl: z.string().optional(),
})

export const POST = async (
    req: MedusaRequest<z.infer<typeof SendWhatsAppMessageSchema>>,
    res: MedusaResponse
) => {
    try {
        const validatedBody = SendWhatsAppMessageSchema.parse(req.body)
        const { to, templateName, bodyParameters, headerType, headerText, headerImageUrl } = validatedBody

        // Create WhatsApp service
        const whatsappService = createWhatsAppService()

        // Create template
        const template: WhatsAppTemplate = {
            templateName,
            bodyParameters,
            headerType: headerType || "image",
            headerText,
            headerImageUrl
        }

        // Send message
        const response = await whatsappService.sendTemplateMessage(to, template)

        // Check if message was sent successfully
        if (!WhatsAppService.isSuccessResponse(response)) {
            const errorMessage = WhatsAppService.getErrorMessage(response)

            return res.status(400).json({
                success: false,
                message: "Failed to send WhatsApp message",
                error: errorMessage,
                data: response,
            })
        }

        res.json({
            success: true,
            message: "WhatsApp message sent successfully",
            data: response,
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
