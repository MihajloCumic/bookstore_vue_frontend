<template>
  <div v-if="books" class="carouselbook">
    <div v-if="books[0]" class="book" @click="toSingleView(books[0])">
      <img v-if="books[0].image" :src="books[0].image" alt="" />
      <img v-else src="../assets/no_image.jpg" alt="" />
      <h3>{{ books[0].title }}</h3>
    </div>
    <div v-if="books[1]" class="book" @click="toSingleView(books[1])">
      <img v-if="books[1].image" :src="books[1].image" alt="" />
      <img v-else src="../assets/no_image.jpg" alt="" />
      <h3>{{ books[1].title }}</h3>
    </div>
    <div v-if="books[2]" class="book" @click="toSingleView(books[2])">
      <img v-if="books[2].image" :src="books[2].image" alt="" />
      <img v-else src="../assets/no_image.jpg" alt="" />
      <h3>{{ books[2].title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "CarouselBook",
  props: {
    books: Array,
  },
  methods: {
    toSingleView(book) {
      this.$router.push({
        name: "singlebook",
        params: { id: book.id, title: book.title },
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.books {
  justify-content: center;
}
.book {
  display: inline-block;
  padding: 1rem;
  width: 25%;
}

img {
  width: 100%;
}
@media screen and (max-width: 413px) {
  h3 {
    font-size: 16px;
  }
}
</style>
