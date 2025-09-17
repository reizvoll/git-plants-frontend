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

    // create cache key
    const cacheKey = `${userId}-${potX}-${potY}-${width}-${height}`;

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
      console.log("Using cached image");
      const cachedImage = imageCache.get(cacheKey)!;

      // download plant GIF for base64 encoding
      const plantResponse = await fetch(plantUrl);
      if (!plantResponse.ok) throw new Error(`Failed to fetch plant: ${plantResponse.status} from ${plantUrl}`);
      const plantBuffer = await plantResponse.arrayBuffer();

      // calculate plant position
      const plantX = calculatedPotX;
      const plantY = calculatedPotY - 70;

      // encode to Base64
      const base64Image = Buffer.from(cachedImage).toString("base64");
      const base64Plant = Buffer.from(plantBuffer).toString("base64");

      // create SVG with base64 encoded GIF
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${customSize.width}" height="${customSize.height}">
  <image href="data:image/jpeg;base64,${base64Image}" width="${customSize.width}" height="${customSize.height}" />
  <image href="data:image/gif;base64,${base64Plant}" x="${plantX - 50}" y="${plantY - 50}" width="100" height="100" />
</svg>`;

      return new Response(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
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

      // 3. compose image using Sharp
      const compositeImage = await sharp(Buffer.from(bgBuffer))
        .resize(customSize.width, customSize.height)
        .composite([
          {
            input: Buffer.from(potBuffer),
            left: calculatedPotX - 40,
            top: calculatedPotY - 40,
            blend: "over"
          }
        ])
        .jpeg({ quality: 90 })
        .toBuffer();

      console.log("Sharp composition success! Buffer size:", compositeImage.length);

      // save to cache
      imageCache.set(cacheKey, compositeImage);

      // remove from cache after 2hr
      setTimeout(() => {
        imageCache.delete(cacheKey);
      }, CACHE_DURATION);

      // encode to Base64
      const base64Image = Buffer.from(compositeImage).toString("base64");
      const base64Plant = Buffer.from(plantBuffer).toString("base64");

      // calculate plant position
      const plantX = calculatedPotX;
      const plantY = calculatedPotY - 70;

      // create SVG with base64 encoded GIF
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${customSize.width}" height="${customSize.height}">
  <image href="data:image/jpeg;base64,${base64Image}" width="${customSize.width}" height="${customSize.height}" />
  <image href="data:image/gif;base64,${base64Plant}" x="${plantX - 50}" y="${plantY - 50}" width="100" height="100" />
</svg>`;

      return new Response(svg, {
        headers: {
          "Content-Type": "image/svg+xml",
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
