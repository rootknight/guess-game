const users = [
  {
    userId: "b0edb5f4-df84-46bc-9503-de9d1974b8e9",
    name: "admin",
    email: "admin@guess.com",
    password: "admin123",
    role: "admin",
  },
];

const categories = [
  {
    type: "hot",
    title: "热门",
    userId: "b0edb5f4-df84-46bc-9503-de9d1974b8e9",
  },
  {
    type: "idiom",
    title: "中国成语",
    userId: "b0edb5f4-df84-46bc-9503-de9d1974b8e9",
  },
  {
    type: "necessities",
    title: "日用品",
    userId: "b0edb5f4-df84-46bc-9503-de9d1974b8e9",
  },
  {
    type: "animal",
    title: "动物",
    userId: "b0edb5f4-df84-46bc-9503-de9d1974b8e9",
  },
  {
    type: "bible",
    title: "圣经",
    userId: "b0edb5f4-df84-46bc-9503-de9d1974b8e9",
  },
];

const words = [
  {
    categoryId: "01",
    word: "热热热",
  },
  {
    categoryId: "02",
    word: "自食其力",
  },
  {
    categoryId: "03",
    word: "碗",
  },
  {
    categoryId: "04",
    word: "兔子",
  },
  {
    categoryId: "05",
    word: "摩西",
  },
];

const rooms = [
  {
    id: "K3L74A",
    userId: "b0edb5f4-df84-46bc-9503-de9d1974b8e9",
    categoryId: "01",
    time: 60,
    startAt: 1643470269815,
    endAt: 1643470274286,
    isEnd: 0,
  },
  {
    id: "T8V6KP",
    userId: "b0edb5f4-df84-46bc-9503-de9d1974b8e9",
    categoryId: "02",
    time: 120,
    startAt: 1643470269815,
    endAt: 1643470274286,
    isEnd: 1,
  },
];

module.exports = {
  categories,
  words,
  users,
  rooms,
};
