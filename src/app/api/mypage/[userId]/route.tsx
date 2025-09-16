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

    console.log("Trying to fetch from:", fullUrl);

    const profileResponse = await fetch(fullUrl, {
      headers: {
        Accept: "application/json"
      }
    });

    console.log("Response status:", profileResponse.status);
    console.log("Response ok:", profileResponse.ok);

    if (!profileResponse.ok) {
      throw new Error(`Failed to fetch profile: ${profileResponse.status} ${profileResponse.statusText}`);
    }

    const result = await profileResponse.json();
    const profileData = result.data || result;

    console.log("Profile data from backend:", profileData);
    console.log("Settings from URL:", { potX, potY, width, height });

    // set size from URL parameters
    const customSize = { width, height };

    // use URL from backend
    const backgroundUrl = profileData.equipped?.backgrounds[0]?.imageUrl;
    const potUrl = profileData.equipped?.pots[0]?.iconUrl;
    const plantUrl = profileData.plants[0]?.currentImageUrl;

    console.log("URLs from backend:", { backgroundUrl, potUrl, plantUrl });

    // calculate pot position using URL parameters
    const potPosition = { x: potX, y: potY };
    const calculatedPotX = Math.round((potPosition.x / 100) * customSize.width);
    const calculatedPotY = Math.round((potPosition.y / 100) * customSize.height);

    // check cache
    if (imageCache.has(cacheKey)) {
      console.log("Using cached image");
      const cachedImage = imageCache.get(cacheKey)!;

      // calculate plant position
      const plantX = calculatedPotX;
      const plantY = calculatedPotY - 70;

      // encode to Base64
      const base64Image = Buffer.from(cachedImage).toString("base64");

      // create HTML page
      const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${userId}'s Garden</title>
  <style>
    body { margin: 0; padding: 0; }
    .garden-container {
      position: relative;
      width: ${customSize.width}px;
      height: ${customSize.height}px;
      overflow: hidden;
    }
    .background {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .plant {
      position: absolute;
      left: ${plantX - 50}px;
      top: ${plantY - 50}px;
      width: 100px;
      height: 100px;
      object-fit: contain;
    }
  </style>
</head>
<body>
  <div class="garden-container">
    <img class="background" src="data:image/jpeg;base64,${base64Image}" alt="Garden Background">
    <img class="plant" src="${plantUrl}" alt="Plant">
  </div>
</body>
</html>`;

      return new Response(html, {
        headers: {
          "Content-Type": "text/html",
          "Cache-Control": "public, max-age=7200" // 2hr
        }
      });
    }

    // compose image using Sharp
    try {
      console.log("Starting Sharp image composition...");

      // 1. download background image
      const bgResponse = await fetch(backgroundUrl);
      if (!bgResponse.ok) throw new Error(`Failed to fetch background: ${bgResponse.status}`);
      const bgBuffer = await bgResponse.arrayBuffer();

      // 2. download pot image
      const potResponse = await fetch(potUrl);
      if (!potResponse.ok) throw new Error(`Failed to fetch pot: ${potResponse.status}`);
      const potBuffer = await potResponse.arrayBuffer();

      console.log("Downloaded images, starting composition...");

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

      // calculate plant position
      const plantX = calculatedPotX;
      const plantY = calculatedPotY - 70;

      // create HTML page
      const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
    <title>${userId}'s Garden</title>
    <style>
    body { margin: 0; padding: 0; }
    .garden-container {
      position: relative;
      width: ${customSize.width}px;
      height: ${customSize.height}px;
      overflow: hidden;
    }
    .background {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .plant {
      position: absolute;
      left: ${plantX - 50}px;
      top: ${plantY - 50}px;
      width: 100px;
      height: 100px;
      object-fit: contain;
    }
  </style>
</head>
<body>
  <div class="garden-container">
    <img class="background" src="data:image/jpeg;base64,${base64Image}" alt="Garden Background">
    <img class="plant" src="${plantUrl}" alt="Plant">
  </div>
</body>
</html>`;

      return new Response(html, {
        headers: {
          "Content-Type": "text/html",
          "Cache-Control": "public, max-age=3600"
        }
      });
    } catch (sharpError) {
      console.log("Sharp composition failed:", sharpError);
      throw sharpError;
    }
  } catch (error) {
    console.error("Error generating image:", error);

    return new Response("Error generating image", {
      status: 500,
      headers: {
        "Content-Type": "text/plain"
      }
    });
  }
}
