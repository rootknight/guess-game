import { fetchCategories, fetchFilteredWords } from "@/app/admin/lib/data";

export async function GET() {
  const res = await fetchCategories();
  return Response.json(res);
}
