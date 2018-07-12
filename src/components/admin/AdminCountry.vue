<template>
  <div class="admin-country">
    {{ msg }}

    <button class="crud-button" @click="onAdd">Add</button>
    <hr>
    <div class="row">
      <div class="col-sm-7">
        <div class="row">
          <div class="col-sm-2">#</div>
          <div class="col-sm-4">Name</div>
          <div class="col-sm-6">Flag</div>
        </div>
        <!-- v-for will be here -->
        <div class="row" v-for="(country, idx) in countries" :key="idx" @click="onItemSelected(country)">
          <div class="col-sm-2">{{ idx + 1 }}</div>
          <div class="col-sm-4">{{ country.name }}</div>
          <div class="col-sm-6"><img :src="country.flag" class="flag-size"></div>
          
        </div>
      </div>
      <div class="col-sm-5">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" class="form-control" id="name" v-model="newcountry.name">
        </div>
        <div class="form-group">
          <label for="flag">Flag:</label>
          <input type="text" class="form-control" id="flag" v-model="newcountry.flag">
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

const tableName = 'countries';

let countriesRef = db.ref(tableName);

export default {
  name: "AdminCountry",
  firebase: {
    countries: {
      source: db.ref(tableName),
      // Optional, allows you to handle any errors.
      cancelCallback(err) {
        console.error(err);
      }
    }
  },
  data() {
    return {
      msg: "Admin Country ",
      key: '', // key for country
      newcountry: {
        name: '',
        flag: '',
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
    onItemSelected: function(country){
      this.key = country['.key'];
      this.newcountry.name = country.name;
      this.newcountry.flag = country.flag;
    },
    onAdd: function() {
      this.reset();
    },
    onCreate: function() {
      var vm = this;
    
      countriesRef.push(this.newcountry)
      .then(
          vm.reset()
      );
    },
    onUpdate: function() {
      var isUpdated = confirm("Are you sure you want to update this country?");
      if (isUpdated){
          countriesRef.child(this.key).set({
            name: this.newcountry.name,
            flag: this.newcountry.flag,
          })
      } else{
          // Do nothing
      }
    },
    onDelete: function() {
      var isDeleted= confirm("Are you sure you want to delete this country?");
      if (isDeleted){
          countriesRef.child(this.key).remove()
          this.reset()
      } else{
          // Do nothing;
      }
    },
    reset: function() {
      this.key = '';
      this.newcountry.name = ''
      this.newcountry.flag = ''
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.admin-country {
  height: 100%;
  width: 100%;
}
.crud-button{
  float: right;
  margin: 10px 10px 10px 10px;
}
.flag-size{
  width: 20px;
  height: 20px;
}
</style>