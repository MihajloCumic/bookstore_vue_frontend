import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/book",
    name: "book",
    component: () => import("../views/BookView.vue"),
  },
  {
    path: "/category/:id/:name",
    name: "category",
    component: () => import("../views/CategoryView.vue"),
  },
  {
    path: "/toplist/:id/:name",
    name: "toplist",
    component: () => import("../views/TopListView.vue"),
  },
  {
    path: "/singlebook/:id/:title",
    name: "singlebook",
    component: () => import("../views/SingleBookView.vue"),
  },
  {
    path: "/giftcard",
    name: "giftcard",
    component: () => import("../views/GiftCardView.vue"),
  },
  {
    path: "/sale",
    name: "sale",
    component: () => import("../views/SalesView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/wishlist",
    name: "wishlist",
    component: () => import("../views/WishListView.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () => import("../views/CartView.vue"),
  },
  {
    path: "/order",
    name: "order",
    component: () => import("../views/OrderView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
