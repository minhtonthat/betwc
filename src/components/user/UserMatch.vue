<template>
  <div class="user">

    <div class="row" v-show="!isEnter">
      <div class="col-sm-4 align-middle">
        Enter Your Email
      </div>
      <div class="col-sm-4 align-middle">
        <input type="email" id="email" v-model="useremail">
      </div>
      <div class="col-sm-4 align-middle">
        <button @click="enterBet">Login</button>
      </div>
    </div>
    <div v-show="isEnter"><h3>Hello {{ userName }}</h3></div>
    <br>
    <div class="row" v-if="isReady">

        <user-match-bet
          class="row well" 
          v-for="(match, idx) in matches" 
          :key="idx"
          :userEmail="user.email"
          :order="idx"
          :match="match"
          :bets="bets"
          :users="users"
          :countries="countries">
        </user-match-bet>
      
    </div>
    
  </div>
</template>

<script>
import UserMatchBet from './UserMatchBet'
import { db } from '../../firebasedb.js'
import moment from 'moment'

const tableBet = 'bets';
const tableUser = 'users';
const tableMatch = 'matches';
const tableCountry = 'countries';

let usersRef = db.ref(tableUser);
let countriesRef = db.ref(tableCountry);
let matchesRef = db.ref(tableMatch);

export default {
  name: 'UserMatch',
  firebase: function() {
    return {
      bets: db.ref(tableBet),
      countries: db.ref(tableCountry),
      matches: db.ref(tableMatch),
      users: db.ref(tableUser),
    }
  },
  components: {
    UserMatchBet,
  },
  data () {
    return {
      msg: 'User - Match',
      useremail: '',
      picked: false,
      isBet: true,
      currentBetMatch: null,
      currentBetCountry: '',
      user: null,
    }
  },
  computed: {
    isEnter: function() {
      if(this.user){
        return true;
      } else{
        return false;
      }
    },
    userName: function() {
      if(this.user){
        return this.user.name;
      } else{
        return '';
      }
    },
    isReady: function() {
      if(this.user){
        return true;
      } else{
        return false;
      }
    }
  },
  methods: {
    getCountryName: function(countryKey) {
      var foundCountry = this.countries.find(country => country['.key'] === countryKey); 
      return foundCountry.name;
    },
    getCountryFlag: function(countryKey) {
      var foundCountry = this.countries.find(country => country['.key'] === countryKey); 
      return foundCountry.flag;
    },
    onBet: function(match){
      this.currentBetMatch = match;
      this.isBet = false;
    },
    onSave: function(match){
      this.isBet = true;
    },
    isBetMatch: function(match) {
      if(this.currentBetMatch){
        if(match['.key'] === this.currentBetMatch['.key']){
          return true
        } else{
          return false
        }
      } else{
        return true
      }
    },
    enterBet: function() {  
      var vm = this;
      if(this.useremail){
        var foundUser = this.users.find(user => user.email === this.useremail);
        if(foundUser){
          console.log('found user')
          this.user = foundUser;
        } else{
          // Create new user
          console.log('create new user')
          var newuser = {
            email: '',
            name: '',
          }

          newuser.email = this.useremail;
          var name = this.useremail.split('@')[0];
          newuser.name = name.charAt(0).toUpperCase() + name.slice(1);

          usersRef.push(newuser)
          .then(
              vm.user = newuser
          );

        }
      } else{
        alert('Please enter your email');
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.user {
  height: 100%;
  width:  100%;
}
.flag-size{
  width: 20px;
  height: 20px;
}
</style>