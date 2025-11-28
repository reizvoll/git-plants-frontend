/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any */
import { GifEncoder } from "@skyra/gifenc";
import sharp from "sharp";
const gifFrames = require("gif-frames") as any;

// Constants
const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2hr
const PLANT_WIDTH = 100;
const PLANT_HEIGHT = 200;
const POT_OFFSET = 40;
const PLANT_OFFSET_X = 50;
const PLANT_OFFSET_Y = 200;

// Frame cache for better performance
const frameCache = new Map<string, Buffer[]>();

interface GifGenerationOptions {
  bgBuffer: Buffer;
  potBuffer: Buffer;
  plantUrl: string;
  customSize: { width: number; height: number };
  calculatedPotX: number;
  calculatedPotY: number;
}

// Extract and process frames from plant GIF
async function extractPlantFrames(plantUrl: string): Promise<Buffer[]> {
  const frameCacheKey = `frames-${plantUrl}`;

  if (frameCache.has(frameCacheKey)) {
    return frameCache.get(frameCacheKey)!;
  }

  const frameData = await gifFrames({
    url: plantUrl,
    frames: "all",
    outputType: "png",
    cumulative: false
  });

  if (!frameData || frameData.length === 0) {
    throw new Error("Failed to extract GIF frames");
  }

  const extractedFrames = await Promise.all(
    frameData.map(async (frame: any, i: number) => {
      const frameStream = await frame.getImage();
      const frameBuffer = frameStream.data;
      const frameWidth = frameStream.width;
      const frameHeight = frameStream.height;

      if (!frameBuffer) {
        throw new Error(`Could not extract frame buffer from PNG stream for frame ${i}`);
      }

      return await sharp(frameBuffer, {
        raw: {
          width: frameWidth,
          height: frameHeight,
          channels: 4 // RGBA
        }
      })
        .resize(PLANT_WIDTH, PLANT_HEIGHT, {
          kernel: sharp.kernel.nearest,
          fastShrinkOnLoad: false
        })
        .png({ quality: 80, compressionLevel: 6 })
        .toBuffer();
    })
  );

  // Cache the processed frames
  frameCache.set(frameCacheKey, extractedFrames);
  setTimeout(() => {
    frameCache.delete(frameCacheKey);
  }, CACHE_DURATION);

  return extractedFrames;
}

// Create base composite (background + pot)
async function createBaseComposite(
  bgBuffer: Buffer,
  potBuffer: Buffer,
  customSize: { width: number; height: number },
  calculatedPotX: number,
  calculatedPotY: number
): Promise<Buffer> {
  return await sharp(bgBuffer)
    .resize(customSize.width, customSize.height)
    .composite([
      {
        input: potBuffer,
        left: calculatedPotX - POT_OFFSET,
        top: calculatedPotY - POT_OFFSET,
        blend: "over"
      }
    ])
    .png()
    .toBuffer();
}

export async function createAnimatedGIF({
  bgBuffer,
  potBuffer,
  plantUrl,
  customSize,
  calculatedPotX,
  calculatedPotY
}: GifGenerationOptions): Promise<Buffer> {
  try {
    // Create base composite and extract plant frames
    const [baseComposite, extractedFrames] = await Promise.all([
      createBaseComposite(bgBuffer, potBuffer, customSize, calculatedPotX, calculatedPotY),
      extractPlantFrames(plantUrl)
    ]);

    // Setup GIF encoder
    const encoder = new GifEncoder(customSize.width, customSize.height);
    encoder.setRepeat(0).setDelay(500).setQuality(1).setDispose(2);

    const chunks: Buffer[] = [];
    const stream = encoder.createReadStream();
    stream.on("data", (chunk: Buffer) => chunks.push(chunk));

    // Composite plant frames with base
    const compositeFrames = await Promise.all(
      extractedFrames.map(async (framePng: Buffer) => {
        return await sharp(baseComposite)
          .composite([
            {
              input: framePng,
              left: calculatedPotX - PLANT_OFFSET_X,
              top: calculatedPotY - PLANT_OFFSET_Y,
              blend: "over"
            }
          ])
          .raw({ depth: "uchar" })
          .toBuffer();
      })
    );

    // Generate GIF
    encoder.start();
    for (const compositeFrame of compositeFrames) {
      encoder.addFrame(new Uint8ClampedArray(compositeFrame));
    }
    encoder.finish();

    return new Promise<Buffer>((resolve) => {
      stream.on("end", () => resolve(Buffer.concat(chunks)));
    });
  } catch (error) {
    console.error("Error creating animated GIF:", error);
    throw error;
  }
}
