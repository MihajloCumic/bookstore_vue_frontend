<template>
  <div class="giftcardlist">
    <div v-for="giftcard in giftcards" :key="giftcard.id" class="mx-auto">
      <b-container>
        <b-row>
          <b-col md="3"></b-col>
          <b-col md="6" class="giftcard">
            <b-row class="show-price">
              <h1>{{ giftcard.amount }}$</h1>
            </b-row>
            <b-row class="info-row">
              <b-col md="4">
                <h3>{{ giftcard.name }}</h3>
              </b-col>
              <b-col md="4"></b-col>
              <b-col md="4">
                <b-row>
                  <b-button block>Purchase</b-button>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
          <b-col md="3"></b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
export default {
  name: "GiftCardList",
  props: {
    giftcards: Array,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  font-size: 70px;
}
.giftcard {
  border-style: solid;
  border-color: black;
  margin: 10px;
}

.show-price {
  border-bottom-style: solid;
}

.info-row {
  padding: 3px;
  padding-top: 5px;
}
</style>
