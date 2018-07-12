<template>
  <div class="center-container">
    Center container
    <slot/>
  </div>
</template>

<script>
export default {
  name: 'CenterContainer',
  data () {
    return {
      msg: 'Welcome to Your Bet World Cup App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .center-container{
    height: 100%;
    width: 100%;
  }
</style>
