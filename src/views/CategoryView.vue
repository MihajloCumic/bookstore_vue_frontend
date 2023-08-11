<template>
  <div class="category">
    <h1>{{ name }}</h1>
    <BookGrid />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BookGrid from "@/components/BookGrid.vue";
export default {
  name: "CategoryView",
  components: {
    BookGrid,
  },
  data() {
    return {
      name: "",
      categoryId: null,
    };
  },

  methods: {
    ...mapActions(["fetchBooksByCategory"]),
  },
  mounted() {
    this.name = this.$route.params.name;
    this.categoryId = this.$route.params.id;

    this.fetchBooksByCategory(this.categoryId);
  },
  watch: {
    $route(nVal) {
      this.name = this.$route.params.name;
      this.categoryId = this.$route.params.id;

      this.fetchBooksByCategory(this.categoryId);
    },
  },
};
</script>
