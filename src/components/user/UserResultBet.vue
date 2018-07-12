<template>
  
  <div class="row well">
    <div class="col-sm-1 align-middle">{{ order + 1 }}</div>
    <div class="col-sm-3 align-middle">
      <span class="glyphicon glyphicon-ok winner" v-show="isWinner(match.country1)"></span>
      <img :src="getCountryFlag(match.country1)" class="flag-size">
      {{ getCountryName(match.country1) }}
      <input type="radio" id="one" :value="match.country1" v-model="currentBetCountry" v-show="!isBet">
      <br>
      <br>
      <div>{{ betCountry(match.country1) }}</div>
    </div>
    <div class="col-sm-3 text-center">
      vs
      <br>
      {{ match.startDate }}
      <br>
      <span class="glyphicon glyphicon-arrow-left">  </span> 
      Bet Team
      <span class="glyphicon glyphicon-arrow-right">  </span> 
    </div>
    <div class="col-sm-3 align-middle">
      <span class="glyphicon glyphicon-ok winner" v-show="isWinner(match.country2)"></span>
      <img :src="getCountryFlag(match.country2)" class="flag-size">
      {{ getCountryName(match.country2) }}
      <input type="radio" id="two" :value="match.country2" v-model="currentBetCountry" v-show="!isBet">
      <br>
      <br>
      <div>{{ betCountry(match.country2) }}</div>
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
  },
  computed: {
    
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
    isWinner: function(countryKey){
      if(countryKey === this.match.winner){
        return true;
      } else{
        return false;
      }
    },
    betCountry: function(countryId) {
      var team = '';
      var vm = this;
      this.bets.forEach(bet => {
        if(countryId === bet.countryWin){
          var user = vm.users.find(user => user.email === bet.userId);
          if(team){
            team += ', ';
          }

          if(user){
            team += user.name;
          } else{
            team += bet.userId.split('@')[0];
          }
        }
      });
      return team;
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