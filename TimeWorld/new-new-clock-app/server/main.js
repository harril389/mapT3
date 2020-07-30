import { Meteor } from 'meteor/meteor';
// import { CronJob } from 'cron';
import {Clock}  from '/imports/api/clocks'
import {ListCountries} from '/imports/api/lists'
import moment from 'moment'
var CronJob = require('cron').CronJob;
Meteor.startup(() => {
  new CronJob({
    cronTime: '* * * * * *',
    onTick: Meteor.bindEnvironment(() => {
      updateTime()
    }),
    start: true,
    timeZone: undefined,
  });
  Meteor.publish("clocks",function(){
    return Clock.find({});   
  })
  Meteor.publish("countries",function(){
    return ListCountries.find({});
  })
  // Meteor.setInterval(()=>{
  //       updateTime()
  //   },1000)
});
function updateTime(){
  Clock.remove({});
  var timer = moment();
  console.log(timer.format("Z") + "-----" + timer.format())
  // console.log(timer)
  var hours = timer.hours()
  var mins = timer.minutes()
  var secs = timer.seconds()
  Clock.insert({
    hours: hours,
    mins: mins,
    secs: secs,
  })
}
