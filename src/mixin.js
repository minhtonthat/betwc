// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import moment from 'moment'

const mixin = {
  methods: {
    convertDateToString: function(date) {
      if (date) {
        return moment(String(date)).format('MM/DD/YYYY hh:mm a');
      }
    },
    convertStringToDate: function(strDate) {
      if (strDate) {
        return moment(strDate, 'MM/DD/YYYY hh:mm a').toDate();
      }
    },
  }
}

export default { mixin }