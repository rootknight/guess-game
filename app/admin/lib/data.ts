import { db } from "@/app/admin/db/index";
import { unstable_noStore as noStore } from "next/cache";

//获取单词
export async function fetchFilteredWords(
  query: string,
  category: string,
  currentPage: number,
  pageSize: number
) {
  noStore();
  const offset = (currentPage - 1) * pageSize;
  try {
    console.log("Fetching words data...");
    const words: any[] = await new Promise((resolve, reject) => {
      db.all(
        `SELECT words.*, categories.type,categories.title FROM words 
        JOIN categories ON words.categoryId = categories.id
        WHERE (word LIKE '%${query}%' OR 
        categories.title LIKE '%${query}%') AND
        categories.type LIKE '${category}'
        ORDER BY words.updatedAt DESC
        LIMIT ${pageSize} OFFSET ${offset}`,
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
    return words;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch words data.");
  }
}
