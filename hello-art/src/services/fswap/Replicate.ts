import Replicate from 'replicate';

export const FaceSwapper = {
  async execute(targetImg: ArrayBuffer, swapImg: ArrayBuffer): Promise<string> {
    const inference = new Replicate({
      auth: process.env.REPLICATE_TOKEN,
    });
    const mimeType = 'image/png';
    return inference.run(
      'lucataco/faceswap:9a4298548422074c3f57258c5d544497314ae4112df80d116f0d2109e843d20d',
      {
        input: {
          target_image: `data:${mimeType};base64,${Buffer.from(targetImg).toString('base64')}`,
          swap_image: `data:${mimeType};base64,${Buffer.from(swapImg).toString('base64')}`,
        },
      },
    ) as any
  },
};
