import { NextResponse, type NextRequest } from "next/server";
import { updateLastActiveStatus } from "@/actions/user";


export async function POST(req: NextRequest) {
  const id = await req.text();
  try {
    await updateLastActiveStatus(id);
  } catch(e) {
    console.error('updateLastActiveStatus', e);
  }

  return NextResponse.json({ status: 200 });
}
