import { createAnimatedGIF } from "@/lib/utils/gifGenerator";
import { NextRequest } from "next/server";
import sharp from "sharp";

// image caching for 2hr
const imageCache = new Map<string, Buffer>();
const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2hr

export async function GET(request: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await params;
    const { searchParams } = new URL(request.url);

    // get settings from query parameters
    const mode = searchParams.get("mode") || "GARDEN"; // default is garden
    const potX = parseFloat(searchParams.get("potX") || "50");
    const potY = parseFloat(searchParams.get("potY") || "80");

    // set default size based on mode
    const defaultWidth = mode === "MINI" ? 267 : 400; // 267px for mini, 400px for garden
    const defaultHeight = mode === "MINI" ? 400 : 300; // 400px for mini, 300px for garden

    const width = parseInt(searchParams.get("width") || defaultWidth.toString());
    const height = parseInt(searchParams.get("height") || defaultHeight.toString());

    // create cache key for GIF
    const cacheKey = `${userId}-${potX}-${potY}-${width}-${height}-gif`;

    // fetch profile data from backend
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const fullUrl = `${apiUrl}/api/public/profile/${userId}`;

    const profileResponse = await fetch(fullUrl, {
      headers: {
        Accept: "application/json"
      }
    });

    if (!profileResponse.ok) {
      throw new Error(`Failed to fetch profile: ${profileResponse.status} ${profileResponse.statusText}`);
    }

    const result = await profileResponse.json();
    const profileData = result.data || result;

    // set size from URL parameters
    const customSize = { width, height };

    // use URL from backend
    const backgroundUrl = profileData.equipped?.backgrounds[0]?.imageUrl;
    const potUrl = profileData.equipped?.pots[0]?.iconUrl;
    const plantUrl = profileData.plants[0]?.currentImageUrl;

    // validate URLs
    if (!backgroundUrl) throw new Error("Background URL is missing");
    if (!potUrl) throw new Error("Pot URL is missing");
    if (!plantUrl) throw new Error("Plant URL is missing");

    // calculate pot position using URL parameters
    const potPosition = { x: potX, y: potY };
    const calculatedPotX = Math.round((potPosition.x / 100) * customSize.width);
    const calculatedPotY = Math.round((potPosition.y / 100) * customSize.height);

    // check cache
    if (imageCache.has(cacheKey)) {
      console.log("Using cached GIF");
      const cachedGif = imageCache.get(cacheKey)!;

      return new Response(new Uint8Array(cachedGif), {
        headers: {
          "Content-Type": "image/gif",
          "Cache-Control": "public, max-age=7200" // 2hr
        }
      });
    }

    // compose image using Sharp
    try {
      // 1&2&3. download images in parallel (including plant GIF)
      const [bgResponse, potResponse, plantResponse] = await Promise.all([
        fetch(backgroundUrl),
        fetch(potUrl),
        fetch(plantUrl)
      ]);

      if (!bgResponse.ok) throw new Error(`Failed to fetch background: ${bgResponse.status} from ${backgroundUrl}`);
      if (!potResponse.ok) throw new Error(`Failed to fetch pot: ${potResponse.status} from ${potUrl}`);
      if (!plantResponse.ok) throw new Error(`Failed to fetch plant: ${plantResponse.status} from ${plantUrl}`);

      console.log("Converting to buffers...");
      const [bgBuffer, potBuffer, plantBuffer] = await Promise.all([
        bgResponse.arrayBuffer(),
        potResponse.arrayBuffer(),
        plantResponse.arrayBuffer()
      ]);
      console.log("Buffer sizes:", {
        bgSize: bgBuffer.byteLength,
        potSize: potBuffer.byteLength,
        plantSize: plantBuffer.byteLength
      });

      // Create animated GIF with all elements composited
      console.log("Creating animated GIF...");
      const animatedGIF = await createAnimatedGIF({
        bgBuffer: Buffer.from(bgBuffer),
        potBuffer: Buffer.from(potBuffer),
        plantUrl,
        customSize,
        calculatedPotX,
        calculatedPotY
      });

      // save to cache
      imageCache.set(cacheKey, animatedGIF);

      // remove from cache after 2hr
      setTimeout(() => {
        imageCache.delete(cacheKey);
      }, CACHE_DURATION);

      return new Response(new Uint8Array(animatedGIF), {
        headers: {
          "Content-Type": "image/gif",
          "Cache-Control": "public, max-age=3600"
        }
      });
    } catch (sharpError) {
      console.log("Sharp composition failed:", sharpError);
      throw sharpError;
    }
  } catch (error) {
    console.error("Error generating image:", error);

    return new Response(`Error generating image: ${error instanceof Error ? error.message : "Unknown error"}`, {
      status: 500,
      headers: {
        "Content-Type": "text/plain"
      }
    });
  }
}
