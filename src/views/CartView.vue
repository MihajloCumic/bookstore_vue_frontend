<template>
  <div class="cart">
    <h1>Your cart</h1>
    <CartList />
    <b-button class="orderBtn" @click="toMakeOrder">Order</b-button>
  </div>
</template>

<script>
import CartList from "@/components/CartList.vue";
import { mapState } from "vuex";

export default {
  name: "CartView",
  components: {
    CartList,
  },
  computed: {
    ...mapState(["token"]),
  },
  methods: {
    toMakeOrder() {
      if (!this.token) {
        alert("You must be logged in to make an order");
        return;
      }
      this.$router.push({
        name: "order",
      });
    },
  },
};
</script>

<style scoped>
.orderBtn {
  width: 20%;
  background-color: var(--dark-blue);
}
.orderBtn:hover {
  background-color: var(--medium-blue);
  border-width: 2px;
  border-color: var(--coral);
}
.orderBtn:active {
  background-color: var(--coral);
}
</style>
