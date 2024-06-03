import { updateActivePetsStatusByTime } from "@/actions/pets";
import { NextResponse } from "next/server";


export async function POST() {
  try {
    await updateActivePetsStatusByTime();
    return NextResponse.json(null, { status: 200 });
  } catch(e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
