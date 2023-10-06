import { HfInference } from "@huggingface/inference";
import {TextToImage} from "@/services/tti/types";

export const HuggingFace: TextToImage = {
    async execute(message: string) {
        const inference = new HfInference(process.env.HF_ACCESS_TOKEN);

        return await inference.textToImage({
            model: 'stabilityai/stable-diffusion-2',
            inputs: message,
            parameters: {
                negative_prompt: 'blurry',
            }
        })
    }
}
