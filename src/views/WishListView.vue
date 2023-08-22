<template>
  <div class="wishlist">
    <h1>Wishlist</h1>
    <BookGrid />
  </div>
</template>

<script>
import BookGrid from "@/components/BookGrid.vue";
import { mapActions } from "vuex";
export default {
  name: "WishListView",
  components: {
    BookGrid,
  },
  methods: {
    ...mapActions(["addWishListBooksToCurrBooks"]),
  },
  mounted() {
    this.addWishListBooksToCurrBooks();
  },
};
</script>
