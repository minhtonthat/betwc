<template>
  <div class="user">
    <br>
    
    <div class="row alert-info">
      <div class="col-sm-2">#</div>
      <div class="col-sm-5">Name</div>
      <div class="col-sm-5">Email</div>
    </div>
    <!-- v-for will be here -->
    <div class="row" v-for="(user, idx) in users" :key="idx" v-bind:class="{ 'alert-success': idx % 2 === 1}">
      <div class="col-sm-2">{{ idx + 1 }}</div>
      <div class="col-sm-5">{{ user.name }}</div>
      <div class="col-sm-5">{{ user.email }}</div>
      
    </div>
  
  </div>
</template>

<script>
import { db } from '../../firebasedb.js'

const tableUser = 'users';

export default {
  name: 'UserMatch',
  firebase: function() {
    return {
      users: db.ref(tableUser),
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