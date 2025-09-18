import sharp from "sharp";
const GIFEncoder = require("gifencoder");
const gifFrames = require("gif-frames") as any;

// Frame cache for better performance
const frameCache = new Map<string, Buffer[]>();
const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2hr

interface GifGenerationOptions {
  bgBuffer: Buffer;
  potBuffer: Buffer;
  plantUrl: string;
  customSize: { width: number; height: number };
  calculatedPotX: number;
  calculatedPotY: number;
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
    // Create base composite (background + pot)
    const baseComposite = await sharp(bgBuffer)
      .resize(customSize.width, customSize.height)
      .composite([
        {
          input: potBuffer,
          left: calculatedPotX - 40,
          top: calculatedPotY - 40,
          blend: "over"
        }
      ])
      .png()
      .toBuffer();

    // Check if frames are already cached
    const frameCacheKey = `frames-${plantUrl}`;
    let extractedFrames: Buffer[];

    if (frameCache.has(frameCacheKey)) {
      console.log("Using cached frames");
      extractedFrames = frameCache.get(frameCacheKey)!;
    } else {
      console.log("Extracting frames from GIF...");
      // Extract frames from GIF using URL (cumulative: false to get independent frames)
      const frameData = await gifFrames({ url: plantUrl, frames: "all", outputType: "png", cumulative: false });

      if (!frameData || frameData.length === 0) {
        throw new Error("Failed to extract GIF frames");
      }

      console.log("Number of frames extracted:", frameData.length);

      // Pre-process frames in parallel and cache them
      console.log("Processing frames in parallel...");
      extractedFrames = await Promise.all(
        frameData.map(async (frame: any, i: number) => {
          const frameStream = await frame.getImage();
          const frameBuffer = frameStream.data;
          const frameWidth = frameStream.width;
          const frameHeight = frameStream.height;

          if (!frameBuffer) {
            throw new Error(`Could not extract frame buffer from PNG stream for frame ${i}`);
          }

          // Convert and resize frame once
          return await sharp(frameBuffer, {
            raw: {
              width: frameWidth,
              height: frameHeight,
              channels: 4 // RGBA
            }
          })
            .resize(100, 100, {
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
    }

    // Create GIF encoder
    const encoder = new GIFEncoder(customSize.width, customSize.height);
    encoder.start();
    encoder.setRepeat(0); // 0 for repeat, -1 for no-repeat
    encoder.setDelay(500); // frame delay in ms (faster animation)
    encoder.setQuality(20); // Lower quality for much faster processing
    encoder.setDispose(2); // disposal method: 2 = restore to background color (clear previous frame)

    // Process cached frames in parallel and add to GIF
    console.log("Compositing frames in parallel...");
    const compositeFrames = await Promise.all(
      extractedFrames.map(async (framePng: Buffer, i: number) => {
        try {
          // Composite frame with background + pot (optimized for speed)
          return await sharp(bgBuffer)
            .resize(customSize.width, customSize.height, {
              kernel: sharp.kernel.nearest, // Faster for pixel art
              fastShrinkOnLoad: false
            })
            .composite([
              {
                input: potBuffer,
                left: calculatedPotX - 40,
                top: calculatedPotY - 40,
                blend: "over"
              },
              {
                input: framePng,
                left: calculatedPotX - 50, // Same as Chrome SVG (plantX - 50)
                top: calculatedPotY - 70 - 50, // Same as Chrome SVG (plantY - 50)
                blend: "over"
              }
            ])
            .raw({ depth: 'uchar' }) // 8-bit depth for GIF
            .toBuffer();
        } catch (frameError) {
          console.error(`Error processing frame ${i}:`, frameError);
          throw frameError;
        }
      })
    );

    // Add all frames to GIF encoder
    console.log("Adding frames to GIF encoder...");
    for (const compositeFrame of compositeFrames) {
      encoder.addFrame(compositeFrame);
    }

    encoder.finish();
    return encoder.out.getData();
  } catch (error) {
    console.error("Error creating animated GIF:", error);
    throw error;
  }
}