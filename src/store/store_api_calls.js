//private
const url = "http://localhost:7000";

const apstractFetch = async function (name) {
  const res = await fetch(`${url}/${name}`);
  const obj = await res.json();
  return obj;
};

//public
export const fetchAllBooks = async function () {
  const books = await apstractFetch("/book");
  return books;
};

export const fetchAllCategories = async function () {
  const categories = await apstractFetch("category");
  return categories;
};

export const fetchBookById = async function (bookId) {
  const book = await apstractFetch(`/book/${bookId}`);
  return book;
};

export const fetchAuthorById = async function (authorId) {
  const author = await apstractFetch(`/author/${authorId}`);
  return author;
};

export const fetchAllTopLists = async function () {
  const toplists = await apstractFetch("toplist");
  return toplists;
};

export const fetchBooksByCategory = async function (categoryId) {
  const category = await apstractFetch(`/category/${categoryId}`);
  return category;
};

export const fetchBooksByTopList = async function (toplistId) {
  const toplist = await apstractFetch(`/toplist/${toplistId}`);
  return toplist;
};

export const logToConsole = function () {
  console.log("hello");
};

export default {
  fetchAllBooks,
  fetchAllCategories,
  fetchAllTopLists,
  fetchBookById,
  fetchAuthorById,
  fetchBooksByCategory,
  fetchBooksByTopList,
  logToConsole,
};
