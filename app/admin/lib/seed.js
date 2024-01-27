const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
// 生成不重复的6位大写字母数字ID
function generateUniqueId() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let uniqueId = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    uniqueId += characters.charAt(randomIndex);
  }

  return uniqueId;
}

// 连接数据库，如果不存在则会创建一个新的数据库文件
const db = new sqlite3.Database("./guessgame.db");

// 导入数据
const { users, categories, words, rooms } = require("./placeholder-data");

// 创建用户表
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
        userId TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        version INTEGER DEFAULT 1
    )
  `);
});

// 创建categories表
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL UNIQUE,
        title TEXT NOT NULL,
        userId TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        version INTEGER DEFAULT 1,
        FOREIGN KEY (userId) REFERENCES users(userId)
    )
  `);
});

// 创建words表
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS words (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        categoryId INTEGER,
        word TEXT NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        version INTEGER DEFAULT 1,
        FOREIGN KEY (categoryId) REFERENCES categories(id)
        UNIQUE (word, categoryId)
    )
  `);
});

// 创建rooms表
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS rooms (
    id TEXT PRIMARY KEY,
    userID TEXT NOT NULL,
    categoryId INTEGER,
    time INTEGER,
    startAt TIMESTAMP,
    endAt TIMESTAMP,
    isEnd NUMERIC,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    version INTEGER DEFAULT 1,
    FOREIGN KEY (userId) REFERENCES users(userId),
    FOREIGN KEY (categoryId) REFERENCES categories(id)
)
  `);
});

db.serialize(async () => {
  // 插入用户数据
  const insertUser = db.prepare(
    "INSERT INTO users (userId, name, email, password,role) VALUES(?,?,?,?,?)"
  );

  for (const user of users) {
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    insertUser.run(
      user.userId,
      user.name,
      user.email,
      hashedPassword,
      user.role
    );
  }

  insertUser.finalize();
});

db.serialize(() => {
  //插入分类数据
  const insertedCategories = db.prepare(
    "INSERT INTO categories (type, title,userId) VALUES (?, ?,?)"
  );
  categories.forEach((category) => {
    insertedCategories.run(category.type, category.title, category.userId);
  });
  insertedCategories.finalize();

  //插入单词
  const insertedWords = db.prepare(
    "INSERT INTO words (categoryId, word) VALUES (?, ?) "
  );
  words.forEach((word) => {
    insertedWords.run(word.categoryId, word.word);
  });
  insertedWords.finalize();

  //插入rooms
  const insertedRooms = db.prepare(
    "INSERT INTO rooms (id, userId, categoryId, time, startAt, endAt, isEnd) VALUES (?,?, ?, ?, ?, ?, ?) "
  );
  rooms.forEach((room) => {
    const roomId = generateUniqueId();
    insertedRooms.run(
      roomId,
      room.userId,
      room.categoryId,
      room.time,
      room.startAt,
      room.endAt,
      room.isEnd
    );
  });
  insertedRooms.finalize();
});
