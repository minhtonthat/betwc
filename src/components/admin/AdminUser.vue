<template>
  <div class="admin-user">
    {{ msg }}

    <button class="crud-button" @click="onAdd">Add</button>
    <hr>
    <div class="row">
      <div class="col-sm-7">
        <div class="row">
          <div class="col-sm-2">#</div>
          <div class="col-sm-5">Name</div>
          <div class="col-sm-5">Email</div>
        </div>
        <!-- v-for will be here -->
        <div class="row" v-for="(user, idx) in users" :key="idx" @click="onItemSelected(user)">
          <div class="col-sm-2">{{ idx + 1 }}</div>
          <div class="col-sm-5">{{ user.name }}</div>
          <div class="col-sm-5">{{ user.email }}</div>
          
        </div>
      </div>
      <div class="col-sm-5">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" class="form-control" id="email" v-model="newuser.email">
        </div>
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" class="form-control" id="name" v-model="newuser.name">
        </div>

        <button class="crud-button" @click="onDelete">Delete</button>
        <button class="crud-button" @click="onUpdate">Update</button>
        <button class="crud-button" @click="onCreate">Create</button>
      
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../firebasedb.js'

let usersRef = db.ref('users')

export default {
  name: "AdminUser",
  firebase: {
    users: {
      source: db.ref('users'),
      // Optional, allows you to handle any errors.
      cancelCallback(err) {
        console.error(err);
      }
    }
  },
  data() {
    return {
      msg: "Admin User ",
      users: [],
      key: '', // key for user
      newuser: {
        email: '',
        name: '',
      }
    };
  },
  computed: {
    isUpdating: function() {
      if (this.key === ''){
        return false;
      } else{
        return true;
      }
    }
  },
  methods: {
    onItemSelected: function(user){
      this.key = user['.key'];
      this.newuser.name = user.name;
      this.newuser.email = user.email;
    },
    onAdd: function() {
      this.reset();
    },
    onCreate: function() {
      var vm = this;
    
      usersRef.push(this.newuser)
      .then(
          vm.reset()
      );
    },
    onUpdate: function() {
      var isUpdated = confirm("Are you sure you want to update this user?");
      if (isUpdated){
          usersRef.child(this.key).set({
            name: this.newuser.name,
            email: this.newuser.email,
          })
      } else{
          // Do nothing
      }
    },
    onDelete: function() {
      var isDeleted= confirm("Are you sure you want to delete this user?");
      if (isDeleted){
          usersRef.child(this.key).remove()
          this.reset()
      } else{
          // Do nothing;
      }
    },
    reset: function() {
      this.key = '';
      this.newuser.email = ''
      this.newuser.name = ''
    },
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.admin-user {
  height: 100%;
  width: 100%;
}
.crud-button{
  float: right;
  margin: 10px 10px 10px 10px;
}
</style>