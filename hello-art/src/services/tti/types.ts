export interface TextToImage {
    execute(prompt: string): Promise<Blob>
}
