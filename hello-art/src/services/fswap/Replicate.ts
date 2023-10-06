import Replicate from 'replicate';

export const FaceSwapper = {
  async execute(
    targetImg: string,
    swapImg: string,
  ) {
    const inference = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    return inference.run(
      'lucataco/faceswap:9a4298548422074c3f57258c5d544497314ae4112df80d116f0d2109e843d20d',
      {
        input: {
          target_image: targetImg,
          swap_image: swapImg,
        },
      },
    );
  },
};
