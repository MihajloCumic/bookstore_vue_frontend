<template>
  <div class="singlebook">
    <h1 v-if="error">Couldn load book.</h1>
    <b-container v-else-if="book">
      <b-row align-v="end">
        <b-col col class="titleCol">
          <h1>{{ book.title }}</h1>
          <img v-if="book.image" :src="book.image" alt="" class="bookImg" />
          <img v-else src="../assets/no_image.jpg" alt="" class="bookImg" />
        </b-col>
        <b-col col class="infoCol">
          <div class="bookInfo">
            <h2>ISBN: {{ book.ISBN }}</h2>
            <h3 v-if="book.author">
              Author: {{ book.author.name }} {{ book.author.surname }}
            </h3>
            <h3>Publisher: {{ book.publisher }}</h3>
            <p>{{ book.description }}</p>
            <div class="quantityContainer">
              <b-button-group class="buttons">
                <h3 class="quantity">Quantity:</h3>
                <b-button @click="reduceQuantity">-</b-button>
                <input class="quantityInput" disabled v-model="quantity" />
                <b-button @click="increaseQuantity">+</b-button>
              </b-button-group>
            </div>
            <div class="cartContainer">
              <b-button class="cartButton" @click="addToCart"
                >Add to cart</b-button
              >
            </div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import SingleBook from "@/components/SingleBook.vue";
import { mapActions } from "vuex";
import { fetchAuthorById } from "@/store/store_api_calls";
export default {
  name: "SingleBookView",
  data() {
    return {
      id: null,
      title: "",
      book: null,
      error: false,
      quantity: 1,
    };
  },
  components: {
    SingleBook,
  },
  methods: {
    ...mapActions(["getBookById", "addBookToCartAction"]),
    addToCart() {
      this.book["quantity"] = this.quantity;
      this.addBookToCartAction(this.book);
      alert(`Book ${this.book.title}, has been added to cart.`);
    },
    reduceQuantity() {
      if (this.quantity == 1) return;
      this.quantity--;
    },
    increaseQuantity() {
      this.quantity++;
    },
  },
  async mounted() {
    this.id = this.$route.params.id;
    this.title = this.$route.params.title;
    this.getBookById(this.id)
      .then((book) => (this.book = book))
      .catch((err) => (this.error = true));
    if (this.book) {
      const author = await fetchAuthorById(this.book.authorID);
      this.book["author"] = {
        name: author[0].name,
        surname: author[0].surname,
      };
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
        this.$forceUpdate();
      }
    },
  },
};
</script>

<style scoped>
.singlebook {
  margin: 25px;
  padding: 10px;
  border-top-style: solid;
  border-bottom-style: solid;
  border-width: 3px;
  border-color: black;
}

.titleCol {
  border-right-style: solid;
  border-width: 1px;
  border-color: black;
}

.bookImg {
  border-style: solid;
  border-width: 2px;
  border-color: black;
}
.cartButton {
  width: 100%;
}

.bookInfo {
  text-align: left;
}
.quantity {
  margin-right: 20px;
}
.quantityInput {
  width: 40px;
  padding: 10px;
}

.buttons {
  padding: 20px;
  width: 10%;
}
</style>
