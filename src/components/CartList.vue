<template>
  <div class="cartlist container">
    <b-table v-if="items" striped hover :items="items" :fields="fields">
      <template #cell(remove_button)="row"
        ><b-button @click="removeItem(row)">Remove</b-button></template
      >
    </b-table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "CartList",
  data() {
    return {
      fields: [
        "title",
        "publisher",
        { key: "author", label: "Author", formatter: "concatNameSurname" },
        { key: "price", label: "Price", formatter: "formatPrice" },
        "quantity",
        "remove_button",
      ],
      items: Array,
      books: Array,
    };
  },
  computed: {
    ...mapState(["cartBooks"]),
  },
  methods: {
    ...mapActions(["removeBookFromCartAction"]),
    concatNameSurname(obj) {
      return obj.name + " " + obj.surname;
    },
    formatPrice(price) {
      return price + "$";
    },
    removeItem(row) {
      const index = this.items.findIndex((obj) => obj.id == row.item.id);
      this.removeBookFromCartAction(this.items[index]);

      this.items.splice(index, 1);
    },
  },
  mounted() {
    this.books = [...this.cartBooks];

    this.items = this.books;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
