<template>
  <div class="user">
    <div>
      {{ msg }}
    </div>
    <hr>
    <div class="row">
      <div class="col-sm-3">
        <ul>
            <li><router-link :to="'/user/list'">User - List</router-link></li>
            <li><router-link :to="'/user/match'">User - Bets</router-link></li>
            <li><router-link :to="'/user/result'">User - Results</router-link></li>
            <li><router-link :to="'/user/leaderboard'">User - Leaderboard</router-link></li>
            
        </ul>
      </div>
      <div class="col-sm-9">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  data () {
    return {
      msg: 'User page'
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
</style>