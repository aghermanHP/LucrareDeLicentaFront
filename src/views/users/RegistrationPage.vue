<template>
	<v-container>
		<v-layout>
			<v-flex xs12 sm5 offset-sm3>
        <v-card class="elevation-5" color="grey lighten-4">
          <v-flex xs12>
            <v-card class="elevation-12">
              <v-toolbar class="cyan" height="80px">
                <v-layout row justify-content-end>
                  <v-card-title>
                      <v-btn dark icon :to="{ name: 'login' }">
                        <v-icon class="icon">mdi-chevron-left</v-icon>
                      </v-btn>
                    <v-toolbar-title
                      class="text"
                      font-weight-medium.font-italic
                      text-uppercase
                      >Create an Account</v-toolbar-title
                    >
                  </v-card-title>
                </v-layout>
              </v-toolbar>
              <v-progress-linear
                v-if="loading"
                :indeterminate="true"
                height="3px"
                class="auth__progress-bar"
              ></v-progress-linear>
							<v-card-text>
								<v-container>
									<v-form ref="form" :autocomplete="false">
										 		<v-layout row>
                  						<v-text-field
                  						  v-model="form.email"
                  						  v-validate="{ min: 5}"
                  						  :disablef="loading"
                                :rules="emailRules"
                  						  data-vv-name="username"
                  						  label="E-mail"
                  						  required
                  						></v-text-field>
                					</v-layout>
													<v-layout row>
                  							<v-text-field
                  							  v-model="form.password"
                  							  v-validate="'password_complexity'"
                  							  :append-icon="itShowPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  							  :type="itShowPassword ? 'text' : 'password'"
                  							  :disablef="loading"
                  							  data-vv-name="password"
                  							  label="Password"
                  							  @click:append="itShowPassword = !itShowPassword"
                  							></v-text-field>
                					</v-layout>
													 <v-layout row>
                  							<v-text-field
                  							  v-model="form.confirmpassword"
                  							  :append-icon=" itShowConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  							  :type="itShowConfirmPassword ? 'text' : 'password'"
                  							  :disablef="loading"
                  							  data-vv-name="confirmpassword"
                  							  label="Confirm Password"
                  							  required
                  							  :rules="[comparePassword]"
                  							  @click:append="itShowConfirmPassword = !itShowConfirmPassword"
                  							></v-text-field>
                							</v-layout>
																		 <v-container grid-list-md text-xs-center>
                  												<v-layout row wrap justify-end>
                  												  <v-flex xs12 lg4 xl2>
                  												    <v-btn
                  												      block
                  												      color="cyan"
                  												      :loading="loading"
                  												      :disabled="loading"
                  												      @click="signUp"
                                                style="color:white"
                  												    >
                  												      SignUp
                  												    </v-btn>
                  												  </v-flex>
                  												</v-layout>
                											</v-container>
									</v-form>
								</v-container>
							</v-card-text>
            </v-card>
          </v-flex>
        </v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
export default {
	 data: () => ({

		 form: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmpassword: ""
    },
    actionCodeSettings: {
      url: "https://qa-labs-35bb1.web.app/login"},
		loading: false,
    notification: false,
    notificationMessage: "",
    itShowPassword: false,
    itShowConfirmPassword: false,
    emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ]							
   }),
   mounted:{
     user(){
       return this.$store.getters.user
     }
   },
   watch:{
     user(value){
       if (value !== null && value !== undefined){
         
       }
     }
   },
	   methods: {
    async signUp() {
      this.loading = true;
      try {
        await this.$store.dispatch("signUpAction", {
          email: this.form.email,
          password: this.form.password,
          actionCodeSettings: this.actionCodeSettings

        });
      this.loading = false;
      } catch (e) {
        alert(e);
      }
    },
    showNotification(e) {
      this.notification = true;
      this.notificationMessage = e;
    }
  },
	 computed: {
    comparePassword() {
      return this.form.password !== this.form.confirmpassword
        ? "Password do not match"
        : true;
		},
		 showNotification(e) {
      this.notification = true;
      this.notificationMessage = e;
    }
  },
}
</script>

<style>
.icon{
	text-decoration: none;
}
.text {
	color: white;
}
</style>