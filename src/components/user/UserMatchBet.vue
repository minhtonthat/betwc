<template>
  
  <div class="row well">
    <div class="col-sm-1 align-middle">{{ order + 1 }}</div>
    <div class="col-sm-3 align-middle">
      <span class="glyphicon glyphicon-ok winner" v-show="isWinner(match.country1)"></span>
      <img :src="getCountryFlag(match.country1)" class="flag-size">
      {{ getCountryName(match.country1) }}
      <input type="radio" id="one" :value="match.country1" v-model="currentBetCountry" v-show="!isBet">
      <span class="glyphicon glyphicon-thumbs-up star" v-show="isBetCountry(match.country1)"></span>
    </div>
    <div class="col-sm-3 text-center">
      vs
      <br>
      {{ match.startDate }}
    </div>
    <div class="col-sm-3 align-middle">
      <span class="glyphicon glyphicon-ok winner" v-show="isWinner(match.country2)"></span>
      <img :src="getCountryFlag(match.country2)" class="flag-size">
      {{ getCountryName(match.country2) }}
      <input type="radio" id="two" :value="match.country2" v-model="currentBetCountry" v-show="!isBet">
      <span class="glyphicon glyphicon-thumbs-up star" v-show="isBetCountry(match.country2)"></span>
    </div>
    <div class="col-sm-2 align-middle" v-show="isEnableBet">
      <button class="crud-button" @click="onBet(match)" v-show="isBet">Bet</button>
      <button class="crud-button" @click="onSave(match)" v-show="!isBet">Save</button>
    </div>
  </div>
      
</template>

<script>
import { db } from '../../firebasedb.js'
import moment from 'moment'

const tableBet = 'bets';

let betsRef = db.ref(tableBet);

export default {
  name: 'UserBetMatch',
  props: [
    'userEmail',
    'order',
    'match',
    'bets',
    'countries',
    'users',
  ],
  data () {
    return {
      msg: 'User - Match',
      picked: false,
      isEnableBet: true,
      isBet: true,
      currentBetCountry: '',
      betKey: '',
    }
  },
  created() {
    var vm = this;
    var betFound;
    vm.bets.forEach(bet => {
      if(bet.userId === vm.userEmail &&
        bet.matchId === vm.match['.key']){
          betFound = bet;
        }
    });

    if(betFound){
      vm.betKey = betFound['.key'];
      vm.currentBetCountry = betFound.countryWin;
    }

    //Check enable bet
    var now = new Date();
    var matchDate = moment(this.match.startDate, 'MM/DD/YYYY hh:mm a').toDate();
    
    if(now < matchDate){
      this.isEnableBet = true;
    } else{
      this.isEnableBet = false;
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
      this.isBet = false;
    },
    onSave: function(match){
      var vm = this;
     
      var user = this.users.find(user => user.email === this.userEmail);
      var userKey = this.userEmail;
      var matchKey = this.match['.key'];
      
      var bet = {
        userId: userKey,
        matchId: matchKey,
        countryWin: this.currentBetCountry,
      }

      if(vm.betKey){
        // Update
        betsRef.child(vm.betKey).set({
            userId: userKey,
            matchId: matchKey,
            countryWin: vm.currentBetCountry,
          })
      } else{
        // Create
        betsRef.push(bet)
        .then((snap) => {
          vm.betKey = snap.key 
          
        });
      }
      
      vm.isBet = true
    },
    isBetCountry: function(countryKey){
      if(this.isBet){
        if(countryKey === this.currentBetCountry){
          return true;
        } else{
          return false;
        }
      } else{
        return false;  
      }
    },
    isWinner: function(countryKey){
      if(countryKey === this.match.winner){
        return true;
      } else{
        return false;
      }
    },
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
.star{
  width: 30px;
  height: 30px;
  font-size: 20px;
  color: #3B5998;
}
.winner{
  color: #00FF00;
}
</style>