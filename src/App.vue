<template>
  <div id="app" >
    <div class="container">
      <div class="row">
        <ul class="nav navbar-nav navbar-top">
          <li><router-link v-bind:to="'/'">Home</router-link></li>
          <li><router-link v-bind:to="'/about'">About</router-link></li>

          <!-- <li><router-link :to="'/admin'">Admin</router-link></li> -->
          <li><router-link :to="'/user'">User</router-link></li>
        </ul>
      </div>
      <hr>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
/**
 * @summary App component
 */
export default {
  name: "App",
  components: {
    
  }
};
</script>

<style>
</style>