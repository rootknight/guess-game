import { getCategories } from "@/lib/fetchers/data";

export async function GET(request: Request) {
  const res = await getCategories("");
  return Response.json(res);
}
