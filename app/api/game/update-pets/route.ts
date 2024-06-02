import { updateActivePetsStatusByTime } from "@/actions/pets";


export async function POST() {
  try {
    await updateActivePetsStatusByTime();
  } catch(e) {
    console.error('updateActivePetsStatusByTime', e);
  }
}
