import { getWordsByCategory } from "@/lib/fetchers/data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "";
  const res = await getWordsByCategory(category);
  return Response.json(res);
}
