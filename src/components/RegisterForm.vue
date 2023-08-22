<template>
  <div class="registerForm">
    <b-container>
      <b-row><h1>Register</h1></b-row>
      <b-row>
        <b-col>
          <b-form class="myForm" @submit="onSubmit" @reset="onReset">
            <b-form-group
              class="formGroup"
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                placeholder="Enter email"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              class="formGroup"
              id="input-group-2"
              label="Name:"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="form.name"
                placeholder="Enter name"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              class="formGroup"
              id="input-group-2"
              label="Surname:"
              label-for="input-2"
            >
              <b-form-input
                id="input-2"
                v-model="form.surname"
                placeholder="Enter surname"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              class="formGroup"
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
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "RegisterForm",
  data() {
    return {
      form: {
        email: "",
        name: "",
        surname: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(["register"]),
    async onSubmit(event) {
      event.preventDefault();
      const { error, success } = await this.register(this.form);
      if (error) alert(error);
      if (success) {
        alert("You have succesfuly registered.");
        this.$router.push({
          name: "home",
        });
      }
    },
    onReset(event) {
      event.preventDefault();
      this.form.email = "";
      this.form.name = "";
      this.form.surname = "";
      this.form.password = "";
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
  text-align: left;
}

.myButton {
  margin: 10px;
}
</style>
