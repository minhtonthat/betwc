<template>
  <div class="user">
    <br>
    
    <div class="row alert-info">
      <div class="col-sm-2">#</div>
      <div class="col-sm-5">Name</div>
      <div class="col-sm-5">Points</div>
    </div>
    <!-- v-for will be here -->
    <!--
    <div v-if="isReady">
      <div class="row" v-for="(user, idx) in users" :key="idx" v-bind:class="{ 'alert-success': idx % 2 === 1}">
        <div class="col-sm-2">{{ idx + 1 }}</div>
        <div class="col-sm-5">{{ user.name }}</div>
        <div class="col-sm-5"></div>
        
      </div>
    </div>

    -->

    <div v-if="isReady">
      <div class="row" v-for="(lead, idx) in userLeads" :key="idx" v-bind:class="{ 'alert-success': idx % 2 === 1}">
        <div class="col-sm-2">{{ idx + 1 }}</div>
        <div class="col-sm-5">{{ lead.name }}</div>
        <div class="col-sm-5">{{ lead.point }}</div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../firebasedb.js'

const tableBet = 'bets';
const tableUser = 'users';
const tableMatch = 'matches';

export default {
  name: 'UserLeaderboard',
  firebase: function() {
    return {
      bets: db.ref(tableBet),
      matches: db.ref(tableMatch),
      users: db.ref(tableUser),
    }
  },
  computed: {
    isReady: function() {
      if(this.users && this.bets && this.matches){
        return true;
      } else{
        return false;
      }
    },
    userLeads: function() {      
      // Calculate user leaders
      var vm = this;
      var leads = [];
      this.users.forEach(user => {
          var userBets = vm.bets.filter(bet => bet.userId === user.email);
          var count = 0;
          userBets.forEach(userBet => {
            var match = vm.matches.find(match => match['.key'] === userBet.matchId);
            if(match){
              if(match.winner === userBet.countryWin){
                count++;  
              }
            }
          });

          var lead = {
            name: user.name,
            point: count,
          }

          leads.push(lead);
      });

      // Order  by highest point
      leads.sort((a, b) => b.point - a.point);
      
      return leads;
    }
  },
  data () {
    return {
      msg: 'User - List',
    }
  },

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