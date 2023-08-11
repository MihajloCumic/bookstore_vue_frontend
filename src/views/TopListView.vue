<template>
  <div class="toplist">
    <h1>{{ name }}</h1>
    <BookGrid />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import BookGrid from "@/components/BookGrid.vue";
export default {
  name: "TopListView",
  components: {
    BookGrid,
  },
  data() {
    return {
      name: "",
      toplistId: null,
    };
  },
  methods: {
    ...mapActions(["fetchBooksByTopList"]),
  },
  mounted() {
    this.name = this.$route.params.name;
    this.toplistId = this.$route.params.id;

    this.fetchBooksByTopList(this.toplistId);
  },
  watch: {
    $route(nVal) {
      this.name = this.$route.params.name;
      this.toplistId = this.$route.params.id;

      this.fetchBooksByTopList(this.toplistId);
    },
  },
};
</script>
