import Replicate from 'replicate';

export const FaceSwapper = {
  async execute(question: string, imgUrl: string) {
    const inference = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    return inference.run(
      'stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf',
      {
        input: {
          image: imgUrl,
          question: question,
        },
      },
    );
  },
};
