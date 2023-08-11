<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand to="/">Bookstore</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/book">Books</b-nav-item>
          <b-nav-item-dropdown text="Categories" right>
            <b-dropdown-item
              v-for="ctg in categories"
              :key="ctg.id"
              :to="`/category/${ctg.id}/${ctg.name}`"
              >{{ ctg.name }}</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item-dropdown text="Top Lists" right>
            <b-dropdown-item
              v-for="tl in toplists"
              :key="tl.id"
              :to="`/toplist/${tl.id}/${tl.name}`"
              >{{ tl.name }}</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item to="/giftcard">Gift cards</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState(["categories", "toplists"]),
  },
  methods: {
    ...mapActions(["fetchCategories", "fetchTopLists"]),
  },
  mounted() {
    this.fetchCategories();
    this.fetchTopLists();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
