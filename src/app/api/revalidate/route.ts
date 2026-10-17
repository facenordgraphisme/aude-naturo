import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Webhook Sanity : à configurer sur https://www.sanity.io/manage (API > Webhooks)
 * URL : https://<domaine>/api/revalidate — secret : SANITY_REVALIDATE_SECRET
 */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature } = await parseBody(req, process.env.SANITY_REVALIDATE_SECRET);
    if (!isValidSignature) return new NextResponse("Signature invalide", { status: 401 });
    revalidateTag("sanity", "max");
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.error(err);
    return new NextResponse((err as Error).message, { status: 500 });
  }
}
