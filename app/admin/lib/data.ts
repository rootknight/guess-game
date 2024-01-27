import sqlite3 from "sqlite3";
import { unstable_noStore as noStore } from "next/cache";
//连接数据库
const db = new sqlite3.Database("./app/admin/lib/guessgame.db");

//获取分类
export async function fetchCategories(query: string) {
  noStore();
  try {
    console.log("Fetching categories data...");
    const categories: any[] = await new Promise((resolve, reject) => {
      db.all(
        `SELECT categories.id,
        categories.type,
        categories.title,
        categories.createdAt,
        categories.updatedAt,
        categories.version,
        users.name as createdUser,
        users.email as createdUserEmail,
        COUNT(words.id) as wordCount
        FROM categories
      JOIN users ON categories.userId = users.userId
      LEFT JOIN words ON categories.id = words.categoryId
      WHERE title LIKE '%${query}%' OR
      users.name LIKE '%${query}%' OR
      users.email LIKE '%${query}%'
      GROUP BY categories.id
      ORDER BY categories.updatedAt DESC`,
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
    return categories;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch categories data.");
  }
}

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

//获取单词页数
export async function fetchWordsPages(query: string, pageSize: number) {
  noStore();
  try {
    console.log("Fetching words pages...");
    const count: any[] = await new Promise((resolve, reject) => {
      db.all(
        `SELECT COUNT(*) as count
        FROM words
        JOIN categories ON words.categoryId = categories.id
        WHERE words.word LIKE '%${query}%' OR 
        categories.title LIKE '%${query}%'`,
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        }
      );
    });
    const totalPages = Math.ceil(Number(count[0].count) / pageSize);
    return totalPages;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch words data.");
  }
}

//获取rooms
export async function fetchRooms() {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    console.log("Fetching rooms data...");
    const rooms: any[] = await new Promise((resolve, reject) => {
      db.all(`SELECT * FROM rooms`, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    return rooms;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch rooms data.");
  }
}

//获取users
export async function fetchUsers() {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: 'no-store'}).
  noStore();

  try {
    console.log("Fetching users data...");
    const users: any[] = await new Promise((resolve, reject) => {
      db.all(`SELECT * FROM users`, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    return users;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch users data.");
  }
}
