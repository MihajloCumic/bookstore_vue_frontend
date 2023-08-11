<template>
  <div class="booklist">
    <div class="paggination">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="books"
      ></b-pagination>
    </div>
    <b-container>
      <b-row v-for="x in rowNum" :key="x">
        <b-col class="kolona" v-for="y in colNum" :key="y">
          <SingleBook
            v-if="
              (x - 1) * colNum +
                (y - 1) +
                (currentPage - 1) * (colNum * rowNum) <
              items.length
            "
            id="books"
            :book="
              items[
                (x - 1) * colNum +
                  (y - 1) +
                  (currentPage - 1) * (colNum * rowNum)
              ]
            "
        /></b-col>
      </b-row>
    </b-container>
    <div class="paggination">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="books"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import SingleBook from "./SingleBook.vue";
import { mapState } from "vuex";
export default {
  name: "Bookgrid",
  components: {
    SingleBook,
  },
  data() {
    return {
      items: [],
      currentPage: 1,
      rowNum: 4,
      colNum: 4,
      perPage: 1,
      rows: 0,
    };
  },
  computed: {
    ...mapState(["currBooks"]),
  },
  mounted() {
    this.items = this.currBooks;

    let tmp = this.currBooks.length / (this.rowNum * this.colNum);
    if (this.currBooks.length % (this.rowNum * this.colNum) > 0) tmp += 1;
    this.rows = tmp;
  },
  watch: {
    currBooks(nVal) {
      this.items = this.currBooks;

      let tmp = this.currBooks.length / (this.rowNum * this.colNum);
      if (this.currBooks.length % (this.rowNum * this.colNum) > 0) tmp += 1;
      this.rows = tmp;
    },
  },
};
</script>

<style scoped>
.paggination {
  display: flex;
  justify-content: center;
}
.kolona {
  margin-bottom: 20px;
}
</style>
