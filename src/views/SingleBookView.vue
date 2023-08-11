<template>
  <div class="singlebook">
    <h1 v-if="error">Couldn load book.</h1>
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
import SingleBook from "@/components/SingleBook.vue";
import { mapActions } from "vuex";
export default {
  name: "SingleBookView",
  data() {
    return {
      id: null,
      title: "",
      book: null,
      error: false,
    };
  },
  components: {
    SingleBook,
  },
  methods: {
    ...mapActions(["getBookById"]),
  },
  mounted() {
    this.id = this.$route.params.id;
    this.title = this.$route.params.title;
    this.getBookById(this.id)
      .then((book) => (this.book = book))
      .catch((err) => (this.error = true));
  },
};
</script>
