import { Meteor } from 'meteor/meteor';
// import { LinksCollection } from '/imports/api/links';
import {Clock}  from '/imports/api/clocks'
import {ListCountries} from '/imports/api/lists'
Meteor.startup(() => {
  Meteor.publish("clocks",function(){
    return Clock.find({});   
  })
  Meteor.publish("countries",function(){
    return ListCountries.find({});
  })
  Meteor.setInterval(()=>{
        updateTime()
    },1000)
});
function updateTime(){
  Clock.remove({});
  var timer = new Date();
  var hours = timer.getHours();
  var mins = timer.getMinutes()
  var secs = timer.getSeconds()
  Clock.insert({
    hours: hours,
    mins: mins,
    secs: secs,
  })
}
