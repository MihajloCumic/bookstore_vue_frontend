<template>
  <div v-if="book" class="singlebook" @click="toSingleView">
    <img v-if="book.image" :src="book.image" alt="" />
    <img v-else src="../assets/no_image.jpg" alt="" />
    <h3>{{ book.title }}</h3>
    <h5 v-if="book.author">{{ book.author.name }} {{ book.author.surname }}</h5>
    <h4 v-if="book.saleID && book.discount">
      <b-badge class="sale">{{ book.discount }}% Sale</b-badge>
      <span class="sale-price">{{ book.price }}$</span>
      <span>{{ book.price - (book.price * book.discount) / 100 }}$</span>
    </h4>
    <h4 v-else>{{ book.price }}$</h4>
  </div>
</template>

<script>
import { fetchAuthorById, fetchSaleById } from "@/store/store_api_calls";
import { mapState } from "vuex";
export default {
  name: "SingleBook",
  props: {
    book: Object,
  },
  computed: {
    ...mapState(["currBooks"]),
  },
  methods: {
    toSingleView() {
      this.$router.push({
        name: "singlebook",
        params: { id: this.book.id, title: this.book.title },
      });
    },
  },
  async mounted() {
    if (this.book) {
      const author = await fetchAuthorById(this.book.authorID);
      this.book["author"] = {
        name: author[0].name,
        surname: author[0].surname,
      };
      if (this.book.saleID) {
        const sale = await fetchSaleById(this.book.saleID);
        if (!sale.error) {
          this.book["discount"] = sale[0].discount;
        }
      }
      this.$forceUpdate();
    }
  },

  watch: {
    async book(nVal) {
      if (this.book) {
        const author = await fetchAuthorById(this.book.authorID);
        this.book["author"] = {
          name: author[0].name,
          surname: author[0].surname,
        };
        if (this.book.saleID) {
          const sale = await fetchSaleById(this.book.saleID);
          if (!sale.error) {
            this.book["discount"] = sale[0].discount;
          }
        }
        this.$forceUpdate();
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.singlebook {
  color: var(myBlack);
  border-top-style: solid;
  border-bottom-style: solid;
  border-width: 5px;
  border-radius: 10px;
  border-color: var(--dark-blue);
  background-color: var(--light-blue2);
  cursor: pointer;
}

.singlebook:hover {
  border-color: var(--coral);
}

img {
  border-radius: 10px 10px 0px 0px;
}

h4 {
  border-top-style: solid;
  border-width: 3px;
  border-color: var(--ivory);
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
