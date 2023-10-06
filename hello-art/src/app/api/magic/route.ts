import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
    const formData = await request.formData();

    const personImage = formData.get("personImage") as File;
    const midjourneyImage = formData.get("midjourneyImage") as File;

    if (!midjourneyImage || !personImage) {
        return NextResponse.json({}, { status: 400 });
    }

    //logic here

    const headers = new Headers();
    headers.set("Content-Type", "image/*");
    return new NextResponse(midjourneyImage, {status: 200, statusText: "OK", headers});
}
