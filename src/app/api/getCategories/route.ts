import { fetchCategories } from "@/lib/fetchers/data";

export async function GET(request: Request) {
  const res = await fetchCategories("");
  return Response.json(res);
}
