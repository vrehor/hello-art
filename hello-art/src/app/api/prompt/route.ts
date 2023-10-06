import { NextRequest, NextResponse } from 'next/server';
import { HuggingFace } from '@/services/tti/HuggingFace';
import { Gipity } from '@/services/chatgipity/gipity';

type RequestData = {
  message: string;
};

export async function POST(request: NextRequest) {
  const { message }: RequestData = await request.json();

  if (!message) {
    return new NextResponse(JSON.stringify({ name: 'Please provide your bio' }), {
      status: 400,
    });
  }

  try {
    const text = await Gipity.execute({
      messages: [
        {
          role: 'user',
          content: message || '',
        },
      ],
    });

    return new NextResponse(text, {
      status: 200,
    });
  } catch (e) {
    console.log(e);
    return new NextResponse('Capcha validation failed', {
      status: 400,
    });
  }
}
