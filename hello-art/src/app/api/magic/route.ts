import { NextRequest, NextResponse } from 'next/server';
import { FaceSwapper } from '../../../services/fswap/Replicate';

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const personImage = formData.get('personImage');
  const midjourneyImage = formData.get('midjourneyImage');
  const personImageBuffer = await new Response(personImage).arrayBuffer();
  const midjourneyImageBuffer = await new Response(midjourneyImage).arrayBuffer();

  if (!midjourneyImage || !personImage) {
    return NextResponse.json({}, { status: 400 });
  }

  const imageUrl = await FaceSwapper.execute(midjourneyImageBuffer, personImageBuffer);

  return new NextResponse(imageUrl, { status: 200 });
}
