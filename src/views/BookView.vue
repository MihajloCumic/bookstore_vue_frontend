<template>
  <div class="book">
    <h1>All Books</h1>
    <BookGrid />
  </div>
</template>

<script>
import BookGrid from "@/components/BookGrid.vue";
import { mapActions } from "vuex";
export default {
  name: "BookView",
  components: {
    BookGrid,
  },
  methods: {
    ...mapActions(["fetchAllBooks"]),
  },
  mounted() {
    this.fetchAllBooks();
  },
};
</script>
