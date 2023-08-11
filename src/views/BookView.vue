<template>
  <div class="book">
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
