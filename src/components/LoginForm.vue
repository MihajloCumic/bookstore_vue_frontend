<template>
  <div class="loginForm">
    <b-container>
      <b-row><h1>Login</h1></b-row>
      <b-row>
        <b-col col-2></b-col>
        <b-col col-8>
          <b-form class="myForm" @submit="onSubmit" @reset="onReset">
            <b-form-group
              class="formGroup"
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                class="formGroup"
                id="input-1"
                v-model="form.email"
                type="email"
                placeholder="Enter email"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              id="input-group-2"
              label="Password:"
              label-for="input-2"
            >
              <b-form-input
                type="password"
                id="input-2"
                v-model="form.password"
                placeholder="Enter password"
                required
              ></b-form-input>
            </b-form-group>

            <b-button class="myButton" type="submit" variant="primary"
              >Submit</b-button
            >
            <b-button class="myButton" type="reset" variant="danger"
              >Reset</b-button
            >
          </b-form>
        </b-col>
        <b-col col-2></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "LoginForm",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["login"]),
    async onSubmit(event) {
      event.preventDefault();
      const { error, success } = await this.login(this.form);
      if (error) alert(error);
      if (success) {
        alert("You have succesfuly logged in.");
        this.$router.push({
          name: "home",
        });
      }
    },
    onReset(event) {
      event.preventDefault();
      (this.form.email = ""), (this.form.password = "");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.myForm {
  padding: 25px;
  border-top: solid;
  border-bottom: solid;
  border-width: 3px;
  border-color: black;
}
.formGroup {
  padding: 10px;
}
.myButton {
  margin: 10px;
}
</style>
