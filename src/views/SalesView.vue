<template>
  <div class="sales">
    <div class="carousels" v-for="sale in sales" :key="sale.id">
      <SalesCarousel :sale="sale" />
    </div>
  </div>
</template>

<script>
import SalesCarousel from "@/components/SalesCarousel.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "SalesView",
  components: {
    SalesCarousel,
  },
  computed: {
    ...mapState(["sales"]),
  },
  methods: {
    ...mapActions(["fetchSales"]),
  },
  mounted() {
    this.fetchSales();
  },
  watch: {
    $route(nVal) {
      this.fetchSales();
    },
  },
};
</script>

<style scoped>
.carousels {
  margin: 20px;
}
</style>
