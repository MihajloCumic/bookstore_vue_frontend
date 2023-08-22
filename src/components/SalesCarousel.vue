<template>
  <div class="salecarousel">
    <div id="viewall">
      <h2>{{ sale.name }} {{ sale.discount }}%</h2>
      <p>View all</p>
    </div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="0"
      controls
      label-next=""
      label-prev=""
      background="#ababab"
      no-animation
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide v-if="books" v-for="index in 9" :key="index">
        <template #img>
          <CarouselBook
            :books="[
              books[index % books.length],
              books[(index + 1) % books.length],
              books[(index + 2) % books.length],
            ]"
          />
        </template>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CarouselBook from "@/components/CarouselBook.vue";
export default {
  name: "SalesCarousel",
  components: {
    CarouselBook,
  },
  props: {
    sale: Object,
  },
  computed: {
    ...mapState(["sales"]),
  },
  data() {
    return {
      slide: 0,
      sliding: null,
      books: [],
    };
  },
  methods: {
    ...mapActions(["fetchBooksBySale", "getBookById"]),
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },
  },
  async mounted() {
    await this.fetchBooksBySale(this.sale.id);
    if (!this.sale.booksIds) return;
    this.sale.booksIds.map((bookId) => {
      this.getBookById(bookId).then((book) => this.books.push(book));
    });
  },
};
</script>

<style scoped></style>
