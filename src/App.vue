<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark" class="navigation">
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
          <b-nav-item to="/sale">Sales</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ms-auto">
          <b-nav-item to="/cart"> <b-icon-cart></b-icon-cart> </b-nav-item>
          <b-nav-item v-if="!token" to="/login">Login</b-nav-item>
          <b-nav-item v-if="!token" disabled>/</b-nav-item>
          <b-nav-item v-if="!token" to="/register">Register</b-nav-item>
          <b-nav-item v-if="token" to="/wishlist">Wishlist</b-nav-item>
          <b-nav-item v-if="token">Profile</b-nav-item>
          <b-nav-item v-if="token" @click="logout">Log out</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view class="main" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState(["categories", "toplists", "token"]),
  },
  methods: {
    ...mapActions(["fetchCategories", "fetchTopLists", "logoutAction"]),
    logout() {
      this.logoutAction();

      if (this.$route.name != "home") {
        this.$router.push({
          name: "home",
        });
      }

      alert("You have logged out.");
    },
  },
  mounted() {
    this.fetchCategories();
    this.fetchTopLists();
  },
};
</script>

<style>
:root {
  --myBlack: #272727;
  --coral: #fa824c;
  --ivory: #fffded;
  --dark-blue: #49516f;
  --brigth-blue: #5bc0eb;
  --medium-blue: #8e9dcc;
  --light-blue: #d3e4f481;
  --light-blue2: #626b8d18;
}
#app {
  font-family: sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: var(--ivory);
}

.main {
  border-top-style: solid;
  border-top-width: 4px;
  border-top-color: var(--coral);
}

.navbar.navbar-dark.bg-dark {
  background-color: var(--dark-blue) !important;
}

.router-link-exact-active.router-link-active {
  color: var(--coral) !important;
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
