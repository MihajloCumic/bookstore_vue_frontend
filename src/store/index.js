import Vue from "vue";
import Vuex from "vuex";
import apiCalls from "@/store/store_api_calls";

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
    replaceCurrBooks(state, books) {
      state.currBooks = books;
    },
  },
  actions: {
    async fetchCategories({ commit, state }) {
      const res = await fetch(`${url}/category`);
      const obj = await res.json();
      if (obj.error) {
        console.log(error);
        return;
      }
      commit("addCategories", obj);
    },
    async fetchTopLists({ commit }) {
      const res = await fetch(`${url}/toplist`);
      const obj = await res.json();
      if (obj.error) {
        console.log(error);
        return;
      }
      commit("addTopLists", obj);
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
      //author****************************************************
      addAuthors(obj[0].Books);

      //author****************************************************
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
      //add authors****************
      await addAuthors(obj[0].Books);
      //**************************
      commit("addBooksIdsToTopList", { toplistId, booksIds });
      commit("replaceCurrBooks", obj[0].Books);
    },
    async fetchAllBooks({ commit, state }) {
      const res = await fetch(`${url}/book`);
      const obj = await res.json();
      if (obj.error) {
        console.log(error);
        return;
      }
      //add authors****************
      await addAuthors(obj);
      //**************************
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
        //add authors****************
        await addAuthors([obj]);
        //**************************
        resolve(obj);
      });
    },
  },
});
