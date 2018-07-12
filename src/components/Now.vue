<template>
  <div>
    This is Now page 
    {{ msg }}
  </div>
</template>

<script>
export default {
  name: 'Now',
  data () {
    return {
      msg: 'Welcome to Your Now Page'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
