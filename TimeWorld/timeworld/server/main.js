import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js';
Meteor.startup(() => {
  return Meteor.methods({
    getServerTime: function(){
      var dateTime = new Date()
      var hours = dateTime.getHours()
      var mins = dateTime.getMinutes()
      var seconds = dateTime.getSeconds()
      var time = [hours, mins, seconds]
      return time;
    }
  });
});