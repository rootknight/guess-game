import db from "@/db/index";
import { unstable_noStore as noStore } from "next/cache";
import { Users, Categories, Words, Rooms } from "@/db/schema";
import { and, count, desc, eq, like, or, sql } from "drizzle-orm";
import { SqliteError } from "better-sqlite3";

//获取分类
export async function fetchCategories(query: string) {
  noStore();
  try {
    const categories = await db
      .select({
        id: Categories.id,
        type: Categories.type,
        title: Categories.title,
        description: Categories.description,
        createdAt: Categories.createdAt,
        updatedAt: Categories.updatedAt,
        version: Categories.version,
        createdUser: Users.name,
        createdUserEmail: Users.email,
        wordCount: count(Words.id),
      })
      .from(Categories)
      .leftJoin(Users, eq(Categories.userId, Users.userId))
      .leftJoin(Words, eq(Categories.id, Words.categoryId))
      .where(
        and(
          or(
            like(Categories.title, `%${query}%`),
            like(Users.name, `%${query}%`),
            like(Users.email, `%${query}%`),
            like(Categories.type, `${query}`)
          ),
          eq(Categories.isDeleted, false)
        )
      )
      .groupBy(Categories.id)
      .orderBy(desc(Categories.updatedAt));
    return {
      success: true,
      status: 200,
      data: categories,
    };
  } catch (error: SqliteError | any) {
    return {
      success: false,
      status: 500,
      data: [],
      message: error.message,
    };
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
    const words: any[] =
      (await db
        .select({
          id: Words.id,
          categoryId: Words.categoryId,
          word: Words.word,
          createdAt: Words.createdAt,
          updatedAt: Words.updatedAt,
          version: Words.version,
          categoryType: Categories.type,
          categoryTitle: Categories.title,
        })
        .from(Words)
        .leftJoin(Categories, eq(Words.categoryId, Categories.id))
        .where(
          and(
            like(Words.word, `%${query}%`),
            like(Categories.type, `${category}`),
            eq(Words.isDeleted, false)
          )
        )
        .orderBy(desc(Words.updatedAt))
        .limit(pageSize)
        .offset(offset)) || [];

    const resaultCount: number =
      (
        await db
          .select({
            resaultCount: count(Words.id),
          })
          .from(Words)
          .leftJoin(Categories, eq(Words.categoryId, Categories.id))
          .where(
            and(
              like(Words.word, `%${query}%`),
              like(Categories.type, `${category}`)
            )
          )
      )[0].resaultCount || 0;

    const resaultPages: number = Math.ceil(resaultCount / pageSize);

    return {
      success: true,
      status: 200,
      data: { words, resaultCount, resaultPages },
    };
  } catch (error: SqliteError | any) {
    return {
      success: false,
      status: 500,
      data: {},
      message: error.message,
    };
  }
}

//获取rooms
export async function fetchRooms() {
  noStore();
  try {
    const rooms = await db.select().from(Rooms).orderBy(desc(Rooms.updatedAt));
    return {
      success: true,
      status: 200,
      data: rooms,
    };
  } catch (error: SqliteError | any) {
    return {
      success: false,
      status: 500,
      data: [],
      message: error.message,
    };
  }
}

//获取users
export async function fetchUsers() {
  noStore();
  try {
    const users = await db.select().from(Users).orderBy(desc(Users.updatedAt));
    return {
      success: true,
      status: 200,
      data: users,
    };
  } catch (error: SqliteError | any) {
    return {
      success: false,
      status: 500,
      data: [],
      message: error.message,
    };
  }
}
