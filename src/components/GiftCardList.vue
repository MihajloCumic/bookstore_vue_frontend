<template>
  <div class="giftcardlist">
    <b-container class="giftcardContainer">
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
                    <b-button block class="customBtn">Purchase</b-button>
                  </b-row>
                </b-col>
              </b-row>
            </b-col>
            <b-col md="3"></b-col>
          </b-row>
        </b-container>
      </div>
    </b-container>
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

.giftcardContainer {
  border-top-style: solid;
  border-width: 3px;
  border-color: var(--coral);
}
.giftcard {
  border-style: solid;
  border-color: var(--dark-blue);
  border-radius: 10px;
  margin: 10px;
}
.customBtn {
  background-color: var(--dark-blue);
  border-style: none;
}

.customBtn:active {
  background-color: var(--dark-blue);
}

.customBtn:hover {
  background-color: var(--medium-blue);
}
.show-price {
  border-bottom-style: solid;
}

.info-row {
  padding: 3px;
  padding-top: 5px;
}
</style>
