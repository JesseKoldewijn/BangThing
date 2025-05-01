import { bangs } from "../bang/source";

export function GET() {
  return new Response(JSON.stringify(bangs));
}
