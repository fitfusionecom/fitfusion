import { NextRequest, NextResponse } from "next/server";
import { listOrders } from "@/lib/data/orders";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    const orders = await listOrders(limit, offset);
    
    return NextResponse.json({ 
      success: true, 
      orders: orders || [] 
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch orders",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
