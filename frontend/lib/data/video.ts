import { sdk } from "@/lib/config";

export interface Video {
  id: string;
  url: string;
  product_id: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  views?: number;
  duration?: number;
}

export const getVideos = async (): Promise<Video[]> => {
  try {
    const res = await sdk.client.fetch(`/store/video`, {
      cache: "force-cache",
    });
    return [];
  } catch (error) {
    console.log("Video fetch ERROR", error);
    return [];
  }
};

export const getVideosByProduct = async (productId: string): Promise<Video[]> => {
  try {
    const res = await sdk.client.fetch(`/store/video?product_id=${productId}`, {
      cache: "force-cache",
    });
    return [];
  } catch (error) {
    console.log("Product video fetch ERROR", error);
    return [];
  }
};
