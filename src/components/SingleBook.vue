<template>
  <div v-if="book" class="singlebook" @click="toSingleView">
    <img v-if="book.image" :src="book.image" alt="" />
    <img v-else src="../assets/no_image.jpg" alt="" />
    <h3>{{ book.title }}</h3>
    <h5>{{ book.author }}</h5>
    <h4 v-if="book.saleID">
      <b-badge class="sale">Sale</b-badge>
      <span class="sale-price">{{ book.price }}$</span> <span>25$</span>
    </h4>
    <h4 v-else>{{ book.price }}$</h4>
  </div>
</template>

<script>
export default {
  name: "SingleBook",
  props: {
    book: Object,
  },
  methods: {
    toSingleView() {
      this.$router.push({
        name: "singlebook",
        params: { id: this.book.id, title: this.book.title },
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.singlebook {
  border-style: solid;
  border-width: 4px;
  border-color: black;
  cursor: pointer;
}

h3,
h4 {
  border-top-style: solid;
  border-width: 2px;
  border-color: black;
}
.sale {
  color: white;
  background-color: red;
  top: 80px;
  right: 150px;
}
.sale-price {
  text-decoration: line-through;
  text-decoration-color: red;
  text-decoration-thickness: 2px;
}
</style>
