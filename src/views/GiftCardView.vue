<template>
  <div class="giftcard">
    <h1 v-if="error">Could not load gift cards.</h1>
    <h1>Gift cards</h1>
    <GiftCardList :giftcards="giftcards" />
  </div>
</template>

<script>
import GiftCardList from "@/components/GiftCardList.vue";
export default {
  name: "GiftCardView",
  components: {
    GiftCardList,
  },
  data() {
    return {
      giftcards: [],
      error: false,
    };
  },
  async created() {
    const res = await fetch(`http://localhost:7000/giftcard`);
    const giftcards = await res.json();
    if (giftcards.error) {
      this.error = true;
      return;
    }
    this.giftcards = giftcards;
    this.giftcards.sort((a, b) => (a.amount > b.amount ? 1 : -1));
  },
};
</script>
