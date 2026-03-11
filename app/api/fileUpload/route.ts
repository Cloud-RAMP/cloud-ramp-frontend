import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    console.log("got your post request");

    // upload file to external store

    return NextResponse.json({ message: "File received!" });
}
