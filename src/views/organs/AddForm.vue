<template>
	 <v-card
    class="mx-auto"
    max-width="700"
  >
      <v-card-title class="cyan">
				<v-toolbar-title class="white--text align-end">
				Ordin de creare a Organelor Asociatiilor
				</v-toolbar-title>
				</v-card-title>
	<v-form
	ref="addform"
  v-model="valid"
  lazy-validation
	>
	    <v-col cols="12" lg="6">
	    	<v-menu
              ref="menu1"
              v-model="menu1"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="Data Document"
                  hint="MM/DD/YYYY"
                  persistent-hint

                  @blur="date = parseDate(form.dateFormatted)"
                  v-on="on"
                ></v-text-field>
              </template>
              
              <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
        </v-menu>
	    </v-col>
	    
      <v-col cols="12" lg="7">
	    	<v-overflow-btn
      		class="my-2"
          v-model="form.organ"
      		:items="form.items"
	    		:rules="denumireRules"
      		label="Denumirea Organului AUAI"
      		dense
      	></v-overflow-btn>
	    </v-col>
	    		<v-layout>
	    		<v-col cols="12" md="6" sm="6">
	    		  			<v-text-field
                    v-model="form.firstName"
	    							:rules="fnameRules"
                    label="First name"
                    required
                            ></v-text-field>
	    		</v-col>
	    						<v-col cols="12" md="6" sm="6">
	    							<v-text-field
                    v-model="form.lastName"
	    							:rules="lnameRules"
                    label="Last name"
                    required
                            ></v-text-field>
	    						</v-col>
	    		</v-layout>
	    		<v-layout justify-center>
	    						<v-col cols="12" md="8" lg="6">
	    							<v-text-field
                    v-model="form.idnp"
	    							:rules="idnpRules"
                    label="IDNP"
                    required
                            ></v-text-field>
	    						</v-col>
	    						</v-layout>
	    <v-layout cols="12"> 
        <v-col lg="6">
	          <v-menu
              ref="menuStart"
              v-model="menuStart"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="start"
                  label="Data Start"
                  hint="MM/DD/YYYY"
                  persistent-hint

                  @blur="start = parseDate(form.start)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="start" no-title @input="menuStart = false"></v-date-picker>
            </v-menu>
	    	</v-col>

        <v-col md="6">
	        <v-menu
              ref="menuFinish"
              v-model="menuFinish"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              max-width="290px"
              min-width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="finish"
                  label="Data Finisarii"
                  hint="MM/DD/YYYY"
                  persistent-hint

                  @blur="finish = parseDate(form.finish)"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="finish" no-title @input="menuFinish = false"></v-date-picker>
          </v-menu>
	    	</v-col>
      </v-layout>

      <v-col cols="12" >
	    	<v-textarea color="cyan" v-model="form.comment">
            <template v-slot:label>
              <div>
               Note
              </div>
            </template>
        </v-textarea>
      </v-col>
      <v-card-actions>
	    	<v-layout row wrap justify-end>
	    		<v-col cols="12" md="4" sm="4">
            <v-btn
              color="info"
	    	    	outlined
	    	    	width="50%"
              @click="writeFormDatesInFirebase"
            >
	    	    ADD +
            </v-btn>
	    		</v-col>
	    	</v-layout>
      </v-card-actions>
	</v-form>
</v-card>
</template>
<script>
import Datepicker from 'vuejs-datepicker';
import firebase from 'firebase';
import {ro} from 'vuejs-datepicker/dist/locale';
export default {
  components:{
    Datepicker,
  },
	data: vm => ({
      ro: ro,
      menu1: false,
      menuStart: false,
      menuFinish: false,
      date:new Date().toISOString().substr(0, 10),
      start: new Date().toISOString().substr(0, 10),
      finish: new Date().toISOString().substr(0, 10),
      denumireRules: [v => !!v || 'Organ is required'],
      fnameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 25) || 'First Name must be less than 25 characters',
      ],
      lnameRules: [
        v => !!v || 'Last Name is required',
        v => (v && v.length <= 25) || 'Last Name must be less than 25 characters',
      ],
      endRules: [
        v => !!v || 'Date is required',
        v => /.+\+.\./.test(v) || 'Date must be valid',
      ],
      	beginRules: [
        v => !!v || 'Date is required',
        v => /.+\+.\./.test(v) || 'Date must be valid',
      ],
      idnpRules: [
				v => !!v || 'IDNP is required',
        v => /^[a-z]+(?:\d{8})$/.test(v) || "Trebuie sa inceapa cu seria + 8 numere"
			],
			 form: {
      dateFormatted:"",
      organ: "",
			firstName: "",
			lastName: "",
			lasting: "",
			idnp: "b00000000",
      items: [ 'Consiliui de Administrare (CA)','Comisiei de Cenzori (CC)', 'Comisiei de Solutionare a Litigiilor (CSL)'],
      comment: "xxxxx",
      startFormatted: "",
      finishFormatted: "",
			valid: true,

    }
    }),
		
    computed: {
      computedDateFormatted () {
        return this.formatDate(this.date), this.formatDate(this.start), this.formatDate(this.finish)
      },
    },
    watch: {
      date (val) {
        this.dateFormatted = this.formatDate(this.date)
      },
      satrt (val) {
        this.startFormated = this.formatDate(this.start)
      },
      finish (val) {
        this.finishFormated = this.formatDate(this.finish)
      }
    },
    methods: {
      formatDate (date) {
        if (!date) return null
        const [year, month, day] = date.split('-')
        return `${month}/${day}/${year}`
      },
      parseDate (date) {
        if (!date) return null
        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      writeFormDatesInFirebase() {
      this.loading = true;
    firebase.firestore().collection(this.form.organ).doc(this.form.idnp).set({
    comments: this.form.comment,
    createdAt: this.date,
    finish: this.finish,
    lasting: this.form.lasting,
    name: this.form.firstName,
    start: this.start,
    surname: this.form.lastName
})
.then(function(){
  alert("item aded with succes!!")
  // router.push({ name: "home" })
})
.catch((e) => {
  alert(e.message)
})
      }
    },
  }
</script>