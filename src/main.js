// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from '@/store'
import router from './router'
import App from './App'
import VueFire from 'vuefire'
import DateTimePicker from "simple-vue2-datetimepicker";
import moment from 'moment'
import mixin from './mixin.js'


Vue.config.productionTip = false;

Vue.config.devtools = true;

Vue.config.performance = true;

Vue.use(VueFire)

Vue.use(DateTimePicker)


Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm a')
  }
})


Vue.mixin({
  methods: {
    convertDateToString: function (date) {
      if (date) {
        return moment(String(date)).format('MM/DD/YYYY hh:mm a');
      }
    },
    convertStringToDate: function (strDate) {
      if (strDate) {
        return moment(strDate, 'MM/DD/YYYY hh:mm a').toDate();
      }
    },
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  mixins: [mixin],
  components: { App },
  template: '<App/>'
})