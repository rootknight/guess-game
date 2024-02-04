import { getWordsByCategory } from "@/lib/fetchers/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "";
  const res = await getWordsByCategory(type);
  return Response.json({ res });
}
