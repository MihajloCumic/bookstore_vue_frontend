<template>
  <div class="cart">
    <h1>Make order</h1>
    <h3>Cart</h3>
    <CartList />
    <OrderForm />
  </div>
</template>

<script>
import CartList from "@/components/CartList.vue";
import OrderForm from "@/components/OrderForm.vue";

export default {
  name: "CartView",
  components: {
    CartList,
    OrderForm,
  },
};
</script>

<style scoped>
.cart {
  padding: 25px;
}
h3 {
  border-top-style: solid;
  border-width: 3px;
  border-color: var(--coral);
}
</style>
