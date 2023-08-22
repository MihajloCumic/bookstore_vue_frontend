<template>
  <div class="orderform">
    <b-container class="orderContainer">
      <h3>Order info</h3>
      <b-form @submit="onSubmit" class="myForm">
        <b-form-group
          class="myFormGroup"
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            class="myInput"
            id="input-1"
            v-model="form.email"
            type="email"
            placeholder="Enter email"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="input-group-2"
          label="Your Name:"
          label-for="input-2"
          class="myFormGroup"
        >
          <b-form-input
            class="myInput"
            id="input-2"
            v-model="form.name"
            placeholder="Enter name"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          class="myFormGroup"
          id="input-group-2"
          label="Your Surname:"
          label-for="input-2"
        >
          <b-form-input
            class="myInput"
            id="input-2"
            v-model="form.surname"
            placeholder="Enter surname"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group
          class="myFormGroup"
          id="input-group-2"
          label="Your Address:"
          label-for="input-2"
        >
          <b-form-input
            class="myInput"
            id="input-2"
            v-model="form.address"
            placeholder="Enter address"
            required
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary" class="orderBtn"
          >Order</b-button
        >
      </b-form></b-container
    >
  </div>
</template>

<script>
import { mapState } from "vuex";
import { makeOrder } from "@/store/store_api_calls";
export default {
  name: "OrderForm",
  data() {
    return {
      form: {
        email: "",
        name: "",
        surname: "",
        address: "",
      },
    };
  },
  computed: {
    ...mapState(["cartBooks", "token"]),
  },
  methods: {
    async onSubmit(event) {
      event.preventDefault();
      const order = await makeOrder(
        {
          address: this.form.address,
          books: this.cartBooks,
        },
        this.token
      );
      if (order.error) {
        alert("Couldnt make an order.");
        return;
      }
      alert("You have succesfully made an order.");
      this.$router.push({
        name: "home",
      });
    },
  },
};
</script>

<style scoped>
.orderContainer {
  padding: 20px;
  max-width: 500px;
  border-top-style: solid;
  border-width: 3px;
  border-color: var(--coral);
}

.myform {
  padding: 10px;
}

.myFormGroup {
  padding: 10px;
}

.myInput {
  border-color: var(--coral);
}
.orderBtn {
  width: 40%;
  margin-top: 10px;
  background-color: var(--dark-blue);
}
.orderBtn:hover {
  background-color: var(--medium-blue);
  border-width: 2px;
  border-color: var(--coral);
}

.orderBtn:active {
  background-color: var(--coral);
}
</style>
