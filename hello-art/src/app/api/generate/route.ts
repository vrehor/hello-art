import {NextRequest, NextResponse} from "next/server";

type RequestData = {
    message: string
    token: string
}

export async function POST(request: NextRequest) {
    const {message, token}: RequestData = await request.json();

    if (!message) {
        return new NextResponse(
            JSON.stringify({name: "Please provide something to search for"}),
            {status: 400}
        );
    }

    try {
        const response =
            await fetch(`https://www.google.com/recaptcha/api/siteverify?  
           secret=${process.env.RECAPTCHA_SECRETKEY}&response=${token}`,
                {
                    method: 'POST'
                });

        await response.json();
    } catch (e) {
        console.log(e);
        return new NextResponse("Capcha validation failed", {
            status: 400,
        });
    }

    return new NextResponse(JSON.stringify({answer: "John Doe"}), {
        status: 200,
    });
}
