//private
const url = "http://localhost:7000";

const apstractFetch = async function (path) {
  const res = await fetch(`${url}/${path}`);
  const obj = await res.json();
  return obj;
};

//public
export const fetchAllBooks = async function () {
  const books = await apstractFetch("book");
  return books;
};

export const fetchAllCategories = async function () {
  const categories = await apstractFetch("category");
  return categories;
};

export const fetchBookById = async function (bookId) {
  const book = await apstractFetch(`book/${bookId}`);
  return book;
};

export const fetchAuthorById = async function (authorId) {
  const author = await apstractFetch(`author/${authorId}`);
  return author;
};

export const fetchAllTopLists = async function () {
  const toplists = await apstractFetch("toplist");
  return toplists;
};

export const fetchBooksByCategory = async function (categoryId) {
  const category = await apstractFetch(`category/${categoryId}`);
  return category;
};

export const fetchBooksByTopList = async function (toplistId) {
  const toplist = await apstractFetch(`toplist/${toplistId}`);
  return toplist;
};

export const fetchAllSales = async function () {
  const sales = await apstractFetch("sale");
  return sales;
};

export const fetchBooksByWishList = async function (wishlistId) {
  const wishlist = await apstractFetch(`wishlist/${wishlistId}`);
  return wishlist;
};

export const fetchSaleById = async function (saleId) {
  const sale = await apstractFetch(`sale/${saleId}`);
  return sale;
};

export const makeOrder = async function (obj, token) {
  const order = await fetch(url + "/order/makeorder", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(obj),
  });
  const jsonOrder = await order.json();
  return jsonOrder;
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
  fetchAllSales,
  fetchBooksByWishList,
  fetchSaleById,
  makeOrder,
  logToConsole,
};
