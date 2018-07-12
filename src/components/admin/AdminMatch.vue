<template>
  <div class="admin-match">
    {{ msg }}

    <button class="crud-button" @click="onAdd">Add</button>
    <hr>
    <div class="row">
      <div class="col-sm-7">
        <div class="row">
          <div class="col-sm-1">#</div>
          <div class="col-sm-2">Country1</div>
          <div class="col-sm-2">Country2</div>
          <div class="col-sm-2">Winner</div>
          <div class="col-sm-5">Start Date</div>
        </div>
        <!-- v-for will be here -->
        <div class="row" v-for="(match, idx) in matches" :key="idx" @click="onItemSelected(match)">
          <div class="col-sm-1">{{ idx + 1 }}</div>
          <div class="col-sm-2">{{ getCountryName(match.country1) }}</div>
          <div class="col-sm-2">{{ getCountryName(match.country2) }}</div>
          <div class="col-sm-2">{{ getCountryName(match.winner) }}</div>
          <div class="col-sm-5">{{ match.startDate }}</div>
        </div>
      </div>
      <div class="col-sm-5">
        <div class="form-group">
          <label for="country1">Country1:</label>
          <select v-model="newmatch.country1">
            <option disabled value="">Please select one</option>
            <option v-for="(country, idx) in countries" :key="idx" :value="country['.key']">{{ country.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="country2">Country2:</label>
          <select v-model="newmatch.country2">
            <option disabled value="">Please select one</option>
            <option v-for="(country, idx) in countries" :key="idx" :value="country['.key']">{{ country.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="country2">Winner:</label>
          <select v-model="newmatch.winner">
            <option disabled value="">Please select one</option>
            <option v-for="(country, idx) in countries" :key="idx" :value="country['.key']">{{ country.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label for="startDate">Start Date:</label>
          
          <date-time-picker v-model="date"></date-time-picker>
        </div>

        <button class="crud-button" @click="onDelete">Delete</button>
        <button class="crud-button" @click="onUpdate">Update</button>
        <button class="crud-button" @click="onCreate">Create</button>
      
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../firebasedb.js'
import DateTimePicker from "simple-vue2-datetimepicker";
import moment from 'moment'

const tableMatch = 'matches';
const tableCountry = 'countries';

let countriesRef = db.ref(tableCountry);
let matchesRef = db.ref(tableMatch);

export default {
  name: "AdminMatch",
  firebase: function() {
    return {
      countries: db.ref(tableCountry),
      matches: db.ref(tableMatch),
    }
  },
  data() {
    return {
      msg: "Admin Country ",
      key: '', // key for match
      newmatch: {
        country1: '',
        country2: '',
        winner: '',
        startDate: '',
      },
      date: new Date(),
    };
  },
  computed: {
    isUpdating: function() {
      if (this.key === ''){
        return false;
      } else{
        return true;
      }
    },
    
  },
  methods: {
    getCountryName: function(countryKey) {
      var foundCountry = this.countries.find(country => country['.key'] === countryKey); 
      if(foundCountry){
         return foundCountry.name; 
      }
    },
    onItemSelected: function(match){
      this.key = match['.key'];
      this.newmatch.country1 = match.country1;
      this.newmatch.country2 = match.country2;
      this.newmatch.winner = match.winner;
      this.newmatch.startDate = match.startDate;
      console.log(match.startDate);
      
      this.date = this.convertStringToDate(match.startDate);
    },
    onAdd: function() {
      this.reset();
    },
    onCreate: function() {
      var vm = this;
      this.newmatch.startDate = this.convertDateToString(this.date);
      matchesRef.push(this.newmatch)
      .then(
          vm.reset()
      );
    },
    onUpdate: function() {
      var isUpdated = confirm("Are you sure you want to update this match?");
      if (isUpdated){
          this.newmatch.startDate = this.convertDateToString(this.date);
          matchesRef.child(this.key).set({
            country1: this.newmatch.country1,
            country2: this.newmatch.country2,
            winner: this.newmatch.winner,
            startDate: this.newmatch.startDate,
          })
      } else{
          // Do nothing
      }
    },
    onDelete: function() {
      var isDeleted= confirm("Are you sure you want to delete this match?");
      if (isDeleted){
          matchesRef.child(this.key).remove()
          this.reset()
      } else{
          // Do nothing;
      }
    },
    reset: function() {
      this.key = '';
      this.newmatch.country1 = ''
      this.newmatch.country2 = ''
      this.newmatch.startDate = ''
      this.date = new Date()
    },
    
  },
  components: {
    DateTimePicker,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.admin-country {
  height: 100%;
  width: 100%;
}
.crud-button{
  float: right;
  margin: 10px 10px 10px 10px;
}
.flag-size{
  width: 20px;
  height: 20px;
}
</style>