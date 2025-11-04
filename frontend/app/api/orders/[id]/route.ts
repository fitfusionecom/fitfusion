import { NextRequest, NextResponse } from "next/server";
import { retrieveOrder } from "@/lib/data/orders";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const order = await retrieveOrder(id);

        return NextResponse.json({
            success: true,
            order: order || null
        });
    } catch (error) {
        console.error("Error fetching order:", error);

        return NextResponse.json(
            {
                success: false,
                error: "Failed to fetch order",
                message: error instanceof Error ? error.message : "Unknown error"
            },
            { status: 500 }
        );
    }
}

