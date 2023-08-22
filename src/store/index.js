import Vue from "vue";
import Vuex from "vuex";
import apiCalls from "@/store/store_api_calls";
import login_register from "./login_register";

Vue.use(Vuex);

const url = "http://localhost:7000";

const addAuthors = async function (books) {
  await books.forEach(async (element) => {
    const res = await fetch(`${url}/author/${element.authorID}`);
    const author = await res.json();
    element["author"] = {
      name: author[0].name,
      surname: author[0].surname,
    };
  });
};

export default new Vuex.Store({
  state: {
    categories: [],
    books: [],
    currBooks: [],
    toplists: [],
    sales: [],
    token: "",
    wishlist: [],
    wishlistId: null,
    cartBooks: [],
  },
  mutations: {
    addBooks(state, books) {
      state.books.push(...books);
    },
    addCategories(state, categories) {
      state.categories = categories;
    },
    addTopLists(state, toplists) {
      state.toplists = toplists;
    },
    addSales(state, sales) {
      state.sales = sales;
    },
    setWishListId(state, wishlistId) {
      state.wishlistId = wishlistId;
    },
    setToken(state, token) {
      state.token = token;
      //localstorage?
    },
    removeToken(state) {
      state.token = "";
      //localstorage?
    },
    addBookToCart(state, book) {
      state.cartBooks.push(book);
    },
    removeBookFromCart(state, book) {
      const index = state.cartBooks.findIndex((obj) => obj.id == book.id);
      state.cartBooks.splice(index, 1);
    },
    updateQuantityOfBook(state, book) {
      const bookExists = state.cartBooks.filter((obj) => obj.id == book.id)[0];
      if (bookExists) {
        bookExists.quantity = bookExists.quantity + book.quantity;
      }
    },
    addBooksToWishList(state, books) {
      state.wishlist.push(...books);
    },
    removeBooksFromWishList(state) {
      state.wishlist = [];
    },
    addBooksIdsToCategory(state, obj) {
      const category = state.categories.filter(
        (ctg) => ctg.id == obj.categoryId
      )[0];
      category["booksIds"] = obj.booksIds;
    },
    addBooksIdsToTopList(state, obj) {
      const toplist = state.toplists.filter((tl) => tl.id == obj.toplistId)[0];
      toplist["booksIds"] = obj.booksIds;
    },
    addBooksIdsToSale(state, obj) {
      const sale = state.sales.filter((sl) => sl.id == obj.saleId)[0];
      sale["booksIds"] = obj.booksIds;
    },
    replaceCurrBooks(state, books) {
      state.currBooks = books;
    },
  },
  actions: {
    async register({ commit }, obj) {
      const token = await login_register.register(obj);
      if (token.error) {
        return { error: token.error };
      }
      commit("setWishListId", token.wishlistId);
      const wishlist = await apiCalls.fetchBooksByWishList(token.wishlistId);
      if (wishlist[0].Books.length > 0) {
        commit("addBooksToWishList", wishlist[0].Books);
      }
      commit("setToken", token.token);
      return { success: true };
    },
    async login({ commit }, obj) {
      const token = await login_register.login(obj);
      if (token.error) {
        return { error: token.error };
      }
      commit("setWishListId", token.wishlistId);
      const wishlist = await apiCalls.fetchBooksByWishList(token.wishlistId);
      if (wishlist[0].Books.length > 0) {
        commit("addBooksToWishList", wishlist[0].Books);
      }
      commit("setToken", token.token);
      return { success: true };
    },
    logoutAction({ commit }) {
      commit("setWishListId", null);
      commit("removeBooksFromWishList");
      commit("removeToken");
    },
    addWishListBooksToCurrBooks({ commit, state }) {
      commit("replaceCurrBooks", state.wishlist);
    },
    addBookToCartAction({ commit, state }, book) {
      const bookExists = state.cartBooks.filter((obj) => obj.id == book.id)[0];
      if (bookExists) {
        commit("updateQuantityOfBook", book);
        return;
      }
      commit("addBookToCart", book);
    },
    removeBookFromCartAction({ commit }, book) {
      commit("removeBookFromCart", book);
    },
    async fetchCategories({ commit, state }) {
      const res = await fetch(`${url}/category`);
      const obj = await res.json();
      if (obj.error) {
        console.log(obj.error);
        return;
      }
      commit("addCategories", obj);
    },
    async fetchTopLists({ commit }) {
      const res = await fetch(`${url}/toplist`);
      const obj = await res.json();
      if (obj.error) {
        console.log(obj.error);
        return;
      }
      commit("addTopLists", obj);
    },
    async fetchSales({ commit }) {
      const sales = await apiCalls.fetchAllSales();
      if (sales.error) {
        console.log(sales.error);
        return;
      }
      commit("addSales", sales);
    },
    async fetchBooksByCategory({ commit, state, dispatch }, categoryId) {
      if (state.categories.length == 0) await dispatch("fetchCategories");

      const category = state.categories.filter(
        (ctg) => ctg.id == categoryId
      )[0];

      if (category && category["booksIds"]) {
        commit(
          "replaceCurrBooks",
          state.books.filter((book) => book.categoryID == categoryId)
        );
        return;
      }
      const res = await fetch(`${url}/category/${categoryId}`);
      const obj = await res.json();
      if (obj.error) {
        console.log(error);
        return;
      }
      const booksIds = obj[0].Books.map((book) => book.id);

      commit("addBooksIdsToCategory", { categoryId, booksIds });

      commit("addBooks", obj[0].Books);
      commit("replaceCurrBooks", obj[0].Books);
    },
    async fetchBooksByTopList({ commit, state, dispatch }, toplistId) {
      if (state.toplists.length == 0) await dispatch("fetchTopLists");

      const toplist = state.toplists.filter((tl) => tl.id == toplistId)[0];

      const res = await fetch(`${url}/toplist/${toplistId}`);
      const obj = await res.json();
      if (obj.error) {
        console.log(error);
        return;
      }
      const booksIds = obj[0].Books.map((book) => book.id);
      if (toplist && toplist["booksIds"]) {
        commit("replaceCurrBooks", obj[0].Books);
        return;
      }

      commit("addBooksIdsToTopList", { toplistId, booksIds });
      commit("replaceCurrBooks", obj[0].Books);
    },
    async fetchBooksBySale({ commit, state, dispatch }, saleId) {
      if (state.sales.length == 0) await dispatch("fetchSales");

      const sale = state.sales.filter((tl) => tl.id == saleId)[0];

      if (sale && sale["booksIds"]) {
        return;
      }

      const res = await fetch(`${url}/sale/${saleId}`);
      const obj = await res.json();
      if (obj.error) {
        console.log(obj.error);
        return;
      }
      if (!obj[0]) {
        return;
      }
      const booksIds = obj[0].Books.map((book) => book.id);

      commit("addBooksIdsToSale", { saleId, booksIds });
    },
    async fetchAllBooks({ commit, state }) {
      const res = await fetch(`${url}/book`);
      const obj = await res.json();
      if (obj.error) {
        console.log(error);
        return;
      }

      commit("replaceCurrBooks", obj);
    },
    getBookById({ commit, state }, id) {
      return new Promise(async (resolve, reject) => {
        const book = state.books.filter((b) => b.id == id)[0];
        if (book) {
          resolve(book);
          return;
        }
        const res = await fetch(`${url}/book/${id}`);
        const obj = await res.json();
        if (obj.error) {
          reject(obj.error);
          return;
        }
        resolve(obj);
      });
    },
  },
});
