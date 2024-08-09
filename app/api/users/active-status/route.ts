import { NextResponse, type NextRequest } from "next/server";
import { updateLastActiveStatus } from "@/actions/user";


export async function POST(req: NextRequest) {
  const id = await req.text();
  try {
    await updateLastActiveStatus(id);
    return NextResponse.json(null, { status: 200 });
  } catch(e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }

}
