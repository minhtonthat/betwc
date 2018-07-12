<template>
  <div>
    <div>
      {{ msg }}
    </div>
    <hr>
    <div class="row">
      <div class="col-sm-3">
        <ul>
            <li><router-link :to="'/admin/user'">Admin - User</router-link></li>
            <li><router-link :to="'/admin/country'">Admin - Country</router-link></li>
            <li><router-link :to="'/admin/match'">Admin - Match</router-link></li>
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
  name: "Admin",
  data() {
    return {
      msg: "Welcome to Your Admin Bet WC Page"
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>