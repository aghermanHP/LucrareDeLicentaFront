import Vue from "vue";
import VeeValidate from "vee-validate";
VeeValidate.Validator.extend("password_complexity", {
  getMessage: () =>
    "The password field must be a combination of at least 8 and max 128 letters in upper and lower case, numbers, special characters (!@#$%^&*)",
  validate: value => {
    let passwordRegex = new RegExp(
      "^((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]))(?=.{8,32}$)(?!.*\\s)"
    );
    return passwordRegex.test(value);
  }
});
Vue.use(VeeValidate);
